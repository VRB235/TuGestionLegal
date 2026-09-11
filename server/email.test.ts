import { describe, expect, it } from "vitest";
import { verifySmtp } from "./email";

describe("SMTP Email Configuration", () => {
  const hasSmtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

  it.skipIf(!hasSmtp)(
    "verifies SMTP credentials are valid and can connect to Gmail",
    async () => {
      const result = await verifySmtp();
      expect(result).toBe(true);
    },
    15000
  );

  it.skipIf(hasSmtp)(
    "skips live SMTP check when SMTP_USER/SMTP_PASS are not set",
    () => {
      expect(hasSmtp).toBe(false);
    }
  );
});
