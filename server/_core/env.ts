export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
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
};
