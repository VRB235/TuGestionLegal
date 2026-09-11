export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  /** Legacy Manus Forge — opcional; la app ya no lo requiere. */
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  smtpUser: process.env.SMTP_USER ?? "",
  smtpPass: process.env.SMTP_PASS ?? "",
  adminEmail: process.env.ADMIN_EMAIL ?? "",
  adminPassword: process.env.ADMIN_PASSWORD ?? "",
  adminName: process.env.ADMIN_NAME ?? "Administrador",
  googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY ?? "",
  googlePlaceId: process.env.GOOGLE_PLACE_ID ?? "ChIJM_DeDM_wpw8RHUzVPD9E8Vg",
  googleWriteReviewUrl:
    process.env.GOOGLE_WRITE_REVIEW_URL ??
    "https://g.page/r/CR1M1Tw_RPFYEBM/review",
  /** URL pública del sitio (enlaces absolutos a /uploads/...). */
  publicAppUrl:
    process.env.PUBLIC_APP_URL ??
    process.env.APP_URL ??
    "",
  cronSecret: process.env.CRON_SECRET ?? "",
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  s3Bucket: process.env.S3_BUCKET ?? "",
  s3Region: process.env.S3_REGION ?? "eu-west-1",
  /** Endpoint custom (Cloudflare R2, MinIO). Vacío = AWS. */
  s3Endpoint: process.env.S3_ENDPOINT ?? "",
  /** Base pública CDN/bucket (sin trailing slash). Si vacío, signed URLs. */
  s3PublicUrl: process.env.S3_PUBLIC_URL ?? "",
};
