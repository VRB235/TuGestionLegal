# Estatus del proyecto — Tu Gestión Legal

**Fecha:** 22 de septiembre de 2026  
**Repo:** https://github.com/VRB235/TuGestionLegal  
**URL prod:** https://web-production-8a7ae.up.railway.app

---

## Veredicto

App + MySQL + Stripe **test** operativos en Railway.  
Bloqueos humanos: **DNS Cloudflare** (aún apunta a Manus), **`RESEND_API_KEY`**, backup MySQL documentado.

---

## Roadmap

| Fase | Estado |
|------|--------|
| **0–2** | ✅ |
| **3** Producción | 🟡 ~85% — live Railway; DNS/email/backup pendientes |
| **4** Stripe | 🟡 ~95% — claves cuenta actual + webhook OK; booking #8 paid vía webhook |
| **5** Mejoras | ⏳ |

### Hecho (22-sep)
- Claves Stripe test de la cuenta actual en Railway + webhook
- Smoke: `booking.create` → Checkout URL → webhook firmado → **#8** `paid`/`confirmed`
- Health Railway `200`
- `PUBLIC_APP_URL` = URL Railway (correcto mientras www no resuelva)

### DNS (bloqueado)
- Railway custom domain `www.tugestionlegal.es`: **Verified: no**
- DNS actual: `www` → `cname.manus.space` (sigue Manus)
- Falta en Cloudflare: CNAME `www` → `4osfmedy.up.railway.app` + TXT verify (`DNS_RAILWAY.md`)

### Pendiente corto (acción humana)
1. Cloudflare DNS según `DNS_RAILWAY.md`
2. Pegar `RESEND_API_KEY` (y opcional dominio en Resend) — ver `EMAIL_RESEND.md`
3. Pago manual `4242` en Chrome (opcional; cierra eslabón UI)
4. Backup MySQL — ver `BACKUP_RAILWAY.md`

---

## Fuentes

- `DEPLOY.md` · `DNS_RAILWAY.md` · `EMAIL_RESEND.md` · `STRIPE.md` · `BACKUP_RAILWAY.md`
