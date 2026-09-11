import type { Request } from "express";
import { ENV } from "./env";

/**
 * Autoriza jobs programados vía `CRON_SECRET` (header o query).
 * Compatible con: Authorization: Bearer <secret> | x-cron-secret | ?cronSecret=
 */
export function isCronAuthorized(req: Request): boolean {
  const secret = ENV.cronSecret;
  if (!secret) return false;

  const headerAuth = req.headers.authorization;
  if (headerAuth?.startsWith("Bearer ") && headerAuth.slice(7) === secret) {
    return true;
  }

  const headerSecret = req.headers["x-cron-secret"];
  if (typeof headerSecret === "string" && headerSecret === secret) {
    return true;
  }

  const q = req.query.cronSecret;
  if (typeof q === "string" && q === secret) {
    return true;
  }

  return false;
}

export function assertCronAuthorized(req: Request): void {
  if (!ENV.cronSecret) {
    const err = new Error(
      "CRON_SECRET not configured — scheduled endpoints are disabled"
    );
    (err as Error & { status: number }).status = 503;
    throw err;
  }
  if (!isCronAuthorized(req)) {
    const err = new Error("Forbidden: invalid cron secret");
    (err as Error & { status: number }).status = 403;
    throw err;
  }
}
