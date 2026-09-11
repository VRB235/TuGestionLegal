/**
 * Storage: S3/R2 (preferido) o disco local `uploads/` (dev / sin bucket).
 * No depende de Manus Forge.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ENV } from "./_core/env";

function normalizeKey(relKey: string): string {
  return relKey.replace(/^\/+/, "").replace(/\.\./g, "");
}

function uploadsRoot(): string {
  return path.resolve(process.cwd(), "uploads");
}

function publicBaseUrl(): string {
  return (ENV.publicAppUrl || "").replace(/\/+$/, "");
}

function hasS3Config(): boolean {
  return Boolean(
    ENV.s3Bucket && ENV.awsAccessKeyId && ENV.awsSecretAccessKey
  );
}

let s3Client: S3Client | null = null;

function getS3(): S3Client {
  if (!s3Client) {
    s3Client = new S3Client({
      region: ENV.s3Region || "auto",
      endpoint: ENV.s3Endpoint || undefined,
      forcePathStyle: Boolean(ENV.s3Endpoint),
      credentials: {
        accessKeyId: ENV.awsAccessKeyId,
        secretAccessKey: ENV.awsSecretAccessKey,
      },
    });
  }
  return s3Client;
}

async function s3Put(
  key: string,
  data: Buffer | Uint8Array | string,
  contentType: string
): Promise<{ key: string; url: string }> {
  const body =
    typeof data === "string" ? Buffer.from(data) : Buffer.from(data);
  await getS3().send(
    new PutObjectCommand({
      Bucket: ENV.s3Bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );

  if (ENV.s3PublicUrl) {
    return {
      key,
      url: `${ENV.s3PublicUrl.replace(/\/+$/, "")}/${key}`,
    };
  }

  const url = await getSignedUrl(
    getS3(),
    new GetObjectCommand({ Bucket: ENV.s3Bucket, Key: key }),
    { expiresIn: 60 * 60 * 24 * 7 }
  );
  return { key, url };
}

async function s3Get(key: string): Promise<{ key: string; url: string }> {
  if (ENV.s3PublicUrl) {
    return {
      key,
      url: `${ENV.s3PublicUrl.replace(/\/+$/, "")}/${key}`,
    };
  }
  const url = await getSignedUrl(
    getS3(),
    new GetObjectCommand({ Bucket: ENV.s3Bucket, Key: key }),
    { expiresIn: 60 * 60 }
  );
  return { key, url };
}

async function localPut(
  key: string,
  data: Buffer | Uint8Array | string,
  contentType: string
): Promise<{ key: string; url: string }> {
  const abs = path.join(uploadsRoot(), key);
  await fs.mkdir(path.dirname(abs), { recursive: true });
  const body =
    typeof data === "string" ? Buffer.from(data) : Buffer.from(data);
  await fs.writeFile(abs, body);
  // contentType reserved for future metadata sidecar; URL is enough for local
  void contentType;
  const base = publicBaseUrl();
  const url = base ? `${base}/uploads/${key}` : `/uploads/${key}`;
  return { key, url };
}

async function localGet(key: string): Promise<{ key: string; url: string }> {
  const abs = path.join(uploadsRoot(), key);
  try {
    await fs.access(abs);
  } catch {
    throw new Error(`Local file not found: ${key}`);
  }
  const base = publicBaseUrl();
  const url = base ? `${base}/uploads/${key}` : `/uploads/${key}`;
  return { key, url };
}

export function getStorageDriver(): "s3" | "local" {
  return hasS3Config() ? "s3" : "local";
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  if (hasS3Config()) {
    return s3Put(key, data, contentType);
  }
  return localPut(key, data, contentType);
}

export async function storageGet(
  relKey: string
): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  if (hasS3Config()) {
    return s3Get(key);
  }
  return localGet(key);
}
