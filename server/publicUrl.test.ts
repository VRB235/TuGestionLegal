import { describe, expect, it, beforeEach, afterEach } from "vitest";

describe("resolvePublicBaseUrl", () => {
  const prev = { ...process.env };

  beforeEach(() => {
    delete process.env.PUBLIC_APP_URL;
    delete process.env.APP_URL;
    process.env.NODE_ENV = "development";
  });

  afterEach(() => {
    process.env = { ...prev };
  });

  it("prefers PUBLIC_APP_URL when set", async () => {
    process.env.PUBLIC_APP_URL = "https://www.tugestionlegal.es/";
    // Re-import ENV by mutating shared ENV object after dynamic import
    const { ENV } = await import("./_core/env");
    (ENV as { publicAppUrl: string; isProduction: boolean }).publicAppUrl =
      "https://www.tugestionlegal.es/";
    (ENV as { isProduction: boolean }).isProduction = false;
    const { resolvePublicBaseUrl } = await import("./publicUrl");
    expect(resolvePublicBaseUrl()).toBe("https://www.tugestionlegal.es");
  });

  it("uses origin header when no PUBLIC_APP_URL", async () => {
    const { ENV } = await import("./_core/env");
    (ENV as { publicAppUrl: string }).publicAppUrl = "";
    (ENV as { isProduction: boolean }).isProduction = false;
    const { resolvePublicBaseUrl } = await import("./publicUrl");
    expect(
      resolvePublicBaseUrl({ originHeader: "http://localhost:3000" })
    ).toBe("http://localhost:3000");
  });
});
