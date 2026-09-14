# Stripe — reservas de asesoría

## Flujo

1. `booking.create` (asesoría) con `STRIPE_SECRET_KEY` → reserva `unpaid` + Checkout Session.
2. Cliente paga en Stripe → redirect a `/reservas/exito` o `/reservas/cancelado`.
3. Webhook `POST /api/stripe/webhook`:
   - `checkout.session.completed` → `paid` + `confirmed` + emails.
   - `checkout.session.expired` → cancela si sigue unpaid.

Sin claves Stripe, el flujo legacy (confirmación por email admin) sigue activo.

## Variables (Railway / `.env`)

| Variable | Uso |
|----------|-----|
| `STRIPE_SECRET_KEY` | API server (test: `sk_test_…`) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Build cliente (test: `pk_test_…`) |
| `STRIPE_WEBHOOK_SECRET` | Firma webhook (`whsec_…`) |
| `PUBLIC_APP_URL` | `success_url` / `cancel_url` de Checkout |

## Webhook prod

- URL: `https://<host>/api/stripe/webhook`
- Eventos: `checkout.session.completed`, `checkout.session.expired`
- Modo **test** mientras usen claves `*_test_*`

## Prueba rápida

1. Crear reserva de asesoría en la app.
2. Pagar con `4242 4242 4242 4242`, fecha futura, CVC cualquiera.
3. Verificar redirect a `/reservas/exito` y en admin `paymentStatus = paid`.

## Local

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Usar el `whsec_…` que imprime el CLI como `STRIPE_WEBHOOK_SECRET`.
