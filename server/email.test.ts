import { describe, expect, it } from "vitest";
import { getMailDriver, verifyMail } from "./mailer";

describe("Mail configuration", () => {
  const hasResend = Boolean(process.env.RESEND_API_KEY);
  const hasSmtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

  it.skipIf(!hasResend && !hasSmtp)(
    "verifies configured mail transport",
    async () => {
      expect(["resend", "smtp"]).toContain(getMailDriver());
      const result = await verifyMail();
      expect(result).toBe(true);
    },
    15000
  );

  it.skipIf(hasResend || hasSmtp)(
    "skips live mail check when RESEND_API_KEY / SMTP_* are not set",
    () => {
      expect(getMailDriver()).toBe("none");
    }
  );
});
