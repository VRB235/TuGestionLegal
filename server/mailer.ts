/**
 * Mail transport: Resend (HTTPS, required on Railway Trial/Hobby) or Gmail SMTP (local).
 */
import nodemailer from "nodemailer";

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export type SendMailInput = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

export function getMailFrom(): string {
  const raw =
    process.env.EMAIL_FROM ||
    process.env.SMTP_USER ||
    "info@tugestionlegal.es";
  if (raw.includes("<")) return raw;
  return `"Tu Gestión Legal" <${raw}>`;
}

/** Buzón que recibe notificaciones de reservas/contacto. */
export function getAdminNotifyEmail(): string {
  return (
    process.env.ADMIN_NOTIFY_EMAIL ||
    process.env.SMTP_USER ||
    process.env.ADMIN_EMAIL ||
    "info@tugestionlegal.es"
  );
}

export function getMailDriver(): "resend" | "smtp" | "none" {
  if (process.env.RESEND_API_KEY?.trim()) return "resend";
  if (process.env.SMTP_USER && process.env.SMTP_PASS) return "smtp";
  return "none";
}

export function isMailConfigured(): boolean {
  return getMailDriver() !== "none";
}

async function withTimeout<T>(promise: Promise<T>, ms = 20_000): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`Mail timeout after ${ms}ms`)), ms);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function sendViaResend(
  input: SendMailInput
): Promise<{ messageId: string }> {
  const apiKey = process.env.RESEND_API_KEY!.trim();
  const payload: Record<string, unknown> = {
    from: getMailFrom(),
    to: Array.isArray(input.to) ? input.to : [input.to],
    subject: input.subject,
    html: input.html,
  };
  if (input.replyTo) payload.reply_to = input.replyTo;
  if (input.attachments?.length) {
    payload.attachments = input.attachments.map((a) => ({
      filename: a.filename,
      content: a.content.toString("base64"),
      content_type: a.contentType || "application/octet-stream",
    }));
  }

  const res = await withTimeout(
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
  );

  const body = (await res.json().catch(() => ({}))) as {
    id?: string;
    message?: string;
    name?: string;
  };

  if (!res.ok) {
    throw new Error(
      `Resend ${res.status}: ${body.message || body.name || JSON.stringify(body)}`
    );
  }

  return { messageId: body.id || "resend-ok" };
}

async function sendViaSmtp(
  input: SendMailInput
): Promise<{ messageId: string }> {
  const user = process.env.SMTP_USER || "";
  const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    connectionTimeout: 12_000,
    greetingTimeout: 12_000,
    socketTimeout: 20_000,
    auth: { user, pass },
  });

  const info = await withTimeout(
    transporter.sendMail({
      from: getMailFrom(),
      to: input.to,
      replyTo: input.replyTo,
      subject: input.subject,
      html: input.html,
      attachments: input.attachments?.map((a) => ({
        filename: a.filename,
        content: a.content,
        contentType: a.contentType || "application/octet-stream",
      })),
    })
  );

  return { messageId: info.messageId || "smtp-ok" };
}

export async function sendMail(
  input: SendMailInput
): Promise<{ messageId: string; driver: "resend" | "smtp" }> {
  const driver = getMailDriver();
  if (driver === "none") {
    throw new Error("Mail not configured: set RESEND_API_KEY (prod) or SMTP_USER/SMTP_PASS (local)");
  }
  console.log(`[Email] driver=${driver} to=${Array.isArray(input.to) ? input.to.join(",") : input.to}`);
  const result =
    driver === "resend" ? await sendViaResend(input) : await sendViaSmtp(input);
  return { ...result, driver };
}

/** Health/check: Resend = key presente; SMTP = verify() */
export async function verifyMail(): Promise<boolean> {
  const driver = getMailDriver();
  if (driver === "none") return false;
  if (driver === "resend") {
    try {
      const res = await withTimeout(
        fetch("https://api.resend.com/domains", {
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY!.trim()}`,
          },
        }),
        10_000
      );
      if (!res.ok) {
        console.warn("[Email] Resend API key check failed:", res.status);
        return false;
      }
      return true;
    } catch (err) {
      console.warn("[Email] Resend verification failed:", err);
      return false;
    }
  }
  try {
    const user = process.env.SMTP_USER || "";
    const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: { user, pass },
    });
    await withTimeout(transporter.verify(), 12_000);
    return true;
  } catch (err) {
    console.warn("[Email] SMTP verification failed:", err);
    return false;
  }
}

/** @deprecated use verifyMail */
export async function verifySmtp(): Promise<boolean> {
  return verifyMail();
}
