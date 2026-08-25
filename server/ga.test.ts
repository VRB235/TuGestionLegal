import { describe, it, expect } from "vitest";

describe("Google Analytics configuration", () => {
  it("VITE_GA_MEASUREMENT_ID is optional until configured", () => {
    const gaId = process.env.VITE_GA_MEASUREMENT_ID;
    // May be undefined or empty in local/dev; when set, must look like a GA4 id
    if (gaId && gaId.length > 0) {
      expect(gaId).toMatch(/^G-[A-Z0-9]+$/);
    } else {
      expect(gaId === undefined || gaId === "").toBe(true);
    }
  });

  it("Google Analytics script is conditionally loaded in index.html", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const indexHtml = fs.readFileSync(
      path.resolve(__dirname, "../client/index.html"),
      "utf-8"
    );
    // Should contain the conditional check for valid GA ID format
    expect(indexHtml).toContain("googletagmanager.com/gtag/js");
    expect(indexHtml).toContain("VITE_GA_MEASUREMENT_ID");
    // Should only load if ID matches G-XXXXXXXXXX pattern
    expect(indexHtml).toContain("match(/^G-[A-Z0-9]+$/)");
  });
});
