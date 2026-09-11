import { describe, expect, it, beforeAll, afterAll } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";
import { storagePut, storageGet, getStorageDriver } from "./storage";
import { isCronAuthorized } from "./_core/cronAuth";
import type { Request } from "express";

describe("storage (local driver)", () => {
  const key = `test/${Date.now()}-phase2.txt`;
  const uploadsDir = path.resolve(process.cwd(), "uploads");

  beforeAll(() => {
    // Ensure no S3 env so local driver is used
    delete process.env.S3_BUCKET;
    delete process.env.AWS_ACCESS_KEY_ID;
    delete process.env.AWS_SECRET_ACCESS_KEY;
  });

  afterAll(async () => {
    try {
      await fs.unlink(path.join(uploadsDir, key));
    } catch {
      /* ignore */
    }
  });

  it("uses local driver without S3 credentials", () => {
    expect(getStorageDriver()).toBe("local");
  });

  it("puts and gets a file under uploads/", async () => {
    const put = await storagePut(key, "fase2-ok", "text/plain");
    expect(put.key).toBe(key);
    expect(put.url).toContain("/uploads/");

    const got = await storageGet(key);
    expect(got.key).toBe(key);
    expect(got.url).toContain(key);

    const disk = await fs.readFile(path.join(uploadsDir, key), "utf8");
    expect(disk).toBe("fase2-ok");
  });
});

describe("cronAuth", () => {
  it("accepts Bearer CRON_SECRET", async () => {
    process.env.CRON_SECRET = "test-cron-secret";
    // ENV is a plain object captured at import — re-import module after set
    const { ENV } = await import("./_core/env");
    (ENV as { cronSecret: string }).cronSecret = "test-cron-secret";

    const req = {
      headers: { authorization: "Bearer test-cron-secret" },
      query: {},
    } as unknown as Request;

    expect(isCronAuthorized(req)).toBe(true);
  });

  it("rejects wrong secret", async () => {
    const { ENV } = await import("./_core/env");
    (ENV as { cronSecret: string }).cronSecret = "test-cron-secret";

    const req = {
      headers: { authorization: "Bearer wrong" },
      query: {},
    } as unknown as Request;

    expect(isCronAuthorized(req)).toBe(false);
  });
});
