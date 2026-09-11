/**
 * Jobs internos (recordatorio 24h + newsletter semanal).
 * Ejecutables por HTTP (/api/scheduled/...) o por timers del proceso Node.
 */

import { resolvePublicBaseUrl } from "./publicUrl";

let lastNewsletterWeekKey = "";

function spainNowParts(): { ymd: string; dow: number; hour: number } {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(new Date()).map((p) => [p.type, p.value])
  );
  const ymd = `${parts.year}-${parts.month}-${parts.day}`;
  const dowMap: Record<string, number> = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 0,
  };
  return {
    ymd,
    dow: dowMap[parts.weekday ?? ""] ?? -1,
    hour: parseInt(parts.hour ?? "0", 10),
  };
}

function tomorrowYmdSpain(): string {
  // Europe/Madrid calendar + 1 day
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Madrid" })
  );
  now.setDate(now.getDate() + 1);
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export async function runSendReminders(): Promise<{
  ok: true;
  targetDate: string;
  total: number;
  sent: number;
  failed: number;
}> {
  const { getConfirmedBookingsForReminder, markReminderSent } = await import(
    "./db"
  );
  const { sendReminderToClient } = await import("./email");

  const targetDate = tomorrowYmdSpain();
  console.log(`[Reminder] Checking confirmed bookings for ${targetDate}`);
  const bookingsToRemind = await getConfirmedBookingsForReminder(targetDate);
  console.log(
    `[Reminder] Found ${bookingsToRemind.length} bookings needing reminder`
  );

  let sent = 0;
  let failed = 0;
  for (const booking of bookingsToRemind) {
    const success = await sendReminderToClient({
      clientName: booking.name,
      clientEmail: booking.email,
      serviceType: booking.serviceType,
      date: booking.date,
      time: booking.time,
    });
    if (success) {
      await markReminderSent(booking.id);
      sent++;
    } else {
      failed++;
    }
  }

  return { ok: true, targetDate, total: bookingsToRemind.length, sent, failed };
}

export async function runSendNewsletter(): Promise<Record<string, unknown>> {
  const { getRecentPublishedPosts, getNewsletterSubscribers } = await import(
    "./db"
  );
  const { sendWeeklyNewsletter } = await import("./email");

  const posts = await getRecentPublishedPosts(7);
  if (posts.length === 0) {
    console.log("[Newsletter] No new posts this week, skipping.");
    return { ok: true, skipped: true, reason: "no_new_posts" };
  }

  const subscribers = await getNewsletterSubscribers();
  if (subscribers.length === 0) {
    console.log("[Newsletter] No active subscribers, skipping.");
    return { ok: true, skipped: true, reason: "no_subscribers" };
  }

  const siteUrl = resolvePublicBaseUrl();
  const result = await sendWeeklyNewsletter(subscribers, posts, siteUrl);
  console.log(
    `[Newsletter] Weekly send complete. Sent: ${result.sent}, Failed: ${result.failed}`
  );
  return {
    ok: true,
    ...result,
    postsCount: posts.length,
    subscribersCount: subscribers.length,
  };
}

/** Si es lunes 09:00–09:59 Europe/Madrid y aún no se envió esta semana ISO. */
export async function maybeRunWeeklyNewsletter(): Promise<void> {
  const { ymd, dow, hour } = spainNowParts();
  if (dow !== 1 || hour !== 9) return;

  const weekKey = ymd;
  if (lastNewsletterWeekKey === weekKey) return;
  lastNewsletterWeekKey = weekKey;
  console.log("[Newsletter] Internal timer: Monday 09h Madrid — running");
  await runSendNewsletter();
}

export function startInternalJobTimers(): void {
  const hourMs = 60 * 60 * 1000;
  console.log(
    "[Jobs] Internal timers enabled (reminders hourly; newsletter Mon 09:00 Europe/Madrid)"
  );

  // Primera pasada a los ~30s para no competir con el arranque
  setTimeout(() => {
    runSendReminders().catch((e) =>
      console.error("[Reminder] Internal run failed:", e)
    );
    maybeRunWeeklyNewsletter().catch((e) =>
      console.error("[Newsletter] Internal run failed:", e)
    );
  }, 30_000);

  setInterval(() => {
    runSendReminders().catch((e) =>
      console.error("[Reminder] Internal run failed:", e)
    );
  }, hourMs);

  setInterval(() => {
    maybeRunWeeklyNewsletter().catch((e) =>
      console.error("[Newsletter] Internal run failed:", e)
    );
  }, hourMs);
}
