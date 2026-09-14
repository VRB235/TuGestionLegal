# Estatus del proyecto — Tu Gestión Legal

**Fecha:** 14 de septiembre de 2026  
**Repo:** https://github.com/VRB235/TuGestionLegal (`78120af`)  
**URL prod:** https://web-production-8a7ae.up.railway.app

---

## Veredicto

**Fase 4 Stripe en marcha en Railway** (claves test + webhook + deploy).  
Pendientes: smoke de pago end-to-end, DNS custom, email (Resend), backup MySQL.  
`PUBLIC_APP_URL` temporal = URL Railway (hasta que `www` resuelva en Cloudflare).

---

## Roadmap

| Fase | Estado |
|------|--------|
| **0–2** | ✅ |
| **3** Producción | 🟡 ~85% — live; DNS/email/backup pendientes |
| **4** Stripe | 🟡 ~90% — código + vars + webhook; falta prueba E2E |
| **5** Mejoras | ⏳ |

### Fase 4 — hecho
- Checkout Session al crear reserva de asesoría
- Webhook confirm/expire; páginas éxito/cancelado
- Migración `0005_stripe_payments`
- Vars Railway + endpoint webhook Stripe (test)
- Doc: `STRIPE.md`

### Pendiente corto
1. Probar tarjeta `4242…` y verificar admin `paid`
2. DNS Cloudflare (`DNS_RAILWAY.md`) → restaurar `PUBLIC_APP_URL=https://www.tugestionlegal.es`
3. `RESEND_API_KEY` + prueba email
4. Backup MySQL en panel Railway

---

## Fuentes

- `DEPLOY.md` · `DNS_RAILWAY.md` · `EMAIL_RESEND.md` · `STRIPE.md`
