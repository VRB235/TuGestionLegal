/**
 * Google Places API (New) — Place Details for live reviews.
 * Key stays server-side. Results cached in memory to limit quota.
 */

export type GoogleReview = {
  authorName: string;
  authorUri: string | null;
  authorPhotoUri: string | null;
  rating: number;
  text: string;
  relativeTime: string | null;
  publishTime: string | null;
  reviewUri: string | null;
};

export type GooglePlaceSummary = {
  placeId: string;
  name: string;
  rating: number;
  userRatingCount: number;
  googleMapsUri: string | null;
  writeReviewUri: string;
  reviews: GoogleReview[];
  source: "google" | "fallback";
  fetchedAt: string;
};

type CacheEntry = { data: GooglePlaceSummary; expiresAt: number };

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
let cache: CacheEntry | null = null;

function preferSpanishText(review: {
  text?: { text?: string; languageCode?: string };
  originalText?: { text?: string; languageCode?: string };
}): string {
  const original = review.originalText;
  if (original?.text && (original.languageCode?.startsWith("es") ?? false)) {
    return original.text;
  }
  if (review.text?.text && (review.text.languageCode?.startsWith("es") ?? false)) {
    return review.text.text;
  }
  return original?.text || review.text?.text || "";
}

export async function fetchGooglePlaceSummary(): Promise<GooglePlaceSummary | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY || "";
  const placeId = process.env.GOOGLE_PLACE_ID || "ChIJM_DeDM_wpw8RHUzVPD9E8Vg";
  const writeReviewUri =
    process.env.GOOGLE_WRITE_REVIEW_URL ||
    "https://g.page/r/CR1M1Tw_RPFYEBM/review";

  if (!apiKey) {
    console.warn("[Places] GOOGLE_PLACES_API_KEY not set");
    return null;
  }

  if (cache && cache.expiresAt > Date.now()) {
    return cache.data;
  }

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "id,displayName,rating,userRatingCount,reviews,googleMapsUri",
    },
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error(
      `[Places] Place Details failed (${response.status}): ${detail.slice(0, 300)}`
    );
    return cache?.data ?? null;
  }

  const json = (await response.json()) as {
    id?: string;
    displayName?: { text?: string };
    rating?: number;
    userRatingCount?: number;
    googleMapsUri?: string;
    reviews?: Array<{
      rating?: number;
      relativePublishTimeDescription?: string;
      publishTime?: string;
      googleMapsUri?: string;
      text?: { text?: string; languageCode?: string };
      originalText?: { text?: string; languageCode?: string };
      authorAttribution?: {
        displayName?: string;
        uri?: string;
        photoUri?: string;
      };
    }>;
  };

  const reviews: GoogleReview[] = (json.reviews || [])
    .map((r) => ({
      authorName: r.authorAttribution?.displayName || "Usuario de Google",
      authorUri: r.authorAttribution?.uri || null,
      authorPhotoUri: r.authorAttribution?.photoUri || null,
      rating: Math.round(r.rating || 0),
      text: preferSpanishText(r).trim(),
      relativeTime: r.relativePublishTimeDescription || null,
      publishTime: r.publishTime || null,
      reviewUri: r.googleMapsUri || null,
    }))
    .filter((r) => r.text.length > 0)
    .slice(0, 8);

  const data: GooglePlaceSummary = {
    placeId: json.id || placeId,
    name: json.displayName?.text || "Tu Gestión Legal",
    rating: json.rating ?? 0,
    userRatingCount: json.userRatingCount ?? 0,
    googleMapsUri: json.googleMapsUri || null,
    writeReviewUri,
    reviews,
    source: "google",
    fetchedAt: new Date().toISOString(),
  };

  cache = { data, expiresAt: Date.now() + CACHE_TTL_MS };
  console.log(
    `[Places] Cached summary: rating=${data.rating} count=${data.userRatingCount} reviews=${data.reviews.length}`
  );
  return data;
}
