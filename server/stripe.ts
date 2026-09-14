import Stripe from "stripe";
import { ASESORIAS } from "@shared/data";
import { resolvePublicBaseUrl } from "./publicUrl";

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY not configured");
  }
  return new Stripe(key);
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

/** Precio en céntimos EUR según catálogo de asesorías. */
export function getServicePriceCents(serviceType: string): number {
  const found = ASESORIAS.find((a) => a.name === serviceType);
  if (!found) {
    throw new Error(`Servicio no pagable online: ${serviceType}`);
  }
  return found.price * 100;
}

export async function createBookingCheckoutSession(params: {
  bookingId: number;
  serviceType: string;
  date: string;
  time: string;
  customerEmail: string;
  customerName: string;
}): Promise<{ sessionId: string; url: string }> {
  const stripe = getStripe();
  const amount = getServicePriceCents(params.serviceType);
  const base = resolvePublicBaseUrl();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: params.customerEmail,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: amount,
          product_data: {
            name: params.serviceType,
            description: `Cita ${params.date} a las ${params.time} — ${params.customerName}`,
          },
        },
      },
    ],
    metadata: {
      bookingId: String(params.bookingId),
      serviceType: params.serviceType,
      date: params.date,
      time: params.time,
      customerName: params.customerName,
    },
    success_url: `${base}/reservas/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/reservas/cancelado?booking_id=${params.bookingId}`,
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 min hold
  });

  if (!session.url) {
    throw new Error("Stripe Checkout session missing URL");
  }

  return { sessionId: session.id, url: session.url };
}
