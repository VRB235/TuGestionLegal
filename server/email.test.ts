import { describe, expect, it } from "vitest";
import { verifySmtp } from "./email";

describe("SMTP Email Configuration", () => {
  it("verifies SMTP credentials are valid and can connect to Gmail", async () => {
    const result = await verifySmtp();
    expect(result).toBe(true);
  }, 15000);
});
