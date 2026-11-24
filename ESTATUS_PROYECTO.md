# Estatus del proyecto — Tu Gestión Legal

**Fecha:** 24 de noviembre de 2026  
**Repo:** https://github.com/VRB235/TuGestionLegal (mirror: leonardoazocarag/tugestionlegal)  
**Dominio:** `https://www.tugestionlegal.es` (IONOS → Raiola; producción)  
**Hosting:** Raiola Hosting Code — CODE1100 / `opebryph`

---

## Veredicto

Producción estable en dominio final: DNS, AutoSSL, SMTP Google, Stripe **live**, JetBackup, higiene operativa hecha (admin rotado, cron, apex→www, secretos fuera de git).  
Siguiente bloque de trabajo: **Fase 5** (mejoras de producto/SEO; no bloquea go-live).

---

## Roadmap

| Fase | Estado |
|------|--------|
| **0–2** | ✅ |
| **3b** Raiola | ✅ producción en `www.tugestionlegal.es` |
| **4** Stripe | ✅ **live** (cobros reales activos) |
| **5** Mejoras | ⏳ pendiente |

### Hecho (ops / higiene — 24 nov)

- `ADMIN_PASSWORD` rotado + login verificado; `ADMIN_RESET_PASSWORD=false`
- Cron cPanel horario → `POST /api/scheduled/sendReminders` (+ timers in-process newsletter)
- Redirect 301 apex `tugestionlegal.es` → `https://www.tugestionlegal.es`
- Docs con secretos en `.gitignore` (no commit)
- Slot hold: unpaid sin sesión Stripe no bloquea horario; precio videoconferencia 47 €

### Hecho (19–20 nov)

- Hosting Code, MySQL, Node 24, SMTP, DNS IONOS, PUBLIC_APP_URL, AutoSSL, JetBackup, Railway apagado, Stripe live

---

## Fase 5 — Qué hay que hacer

Orden sugerido (no bloqueante):

1. **Google Analytics + Search Console** + `sitemap.xml`.
2. **Meta title/description** por página.
3. **Migración de imágenes** a CDN propio (hoy hay dependencias Manus CDN).
4. **Pagos de packs** (precio fijo) o flujo “solicitud de presupuesto”.
5. **Recordatorios SMS/WhatsApp** (opcional).
6. **Calendario Google API** real (hoy es link `calendar.google.com/render`).

---

## Fuentes

- `DEPLOY_RAIOLA.md` · `MANUAL_CLIENTE_CONTRATAR_RAIOLA.md` · `.env.raiola.example` · `DEPLOY.md` · `STRIPE.md` · `Plan_Paso_a_Paso_Tu_Gestion_Legal.md`
