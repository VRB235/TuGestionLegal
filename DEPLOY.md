# Deploy — Fase 3 (Tu Gestión Legal)

Guía operativa para publicar el monolito (Express + Vite SPA + MySQL) en **Railway** (preferido) o Render.

Dominio objetivo: `https://www.tugestionlegal.es`

---

## Prerrequisitos

- Repo en GitHub: `VRB235/TuGestionLegal`
- Cuenta [Railway](https://railway.app) (o Render)
- Secretos de producción (SMTP, JWT nuevo, admin) — **no** reutilizar los de local si circularon
- DNS del dominio apuntando al host cuando exista URL estable

---

## Variables de entorno (producción)

| Variable | Obligatoria | Notas |
|----------|-------------|--------|
| `DATABASE_URL` | sí | Plugin MySQL de Railway o externo |
| `JWT_SECRET` | sí | String largo **nuevo** |
| `NODE_ENV` | sí | `production` |
| `PORT` | no | Lo asigna Railway |
| `PUBLIC_APP_URL` | sí | `https://www.tugestionlegal.es` (o la URL `*.railway.app` temporal) |
| `SMTP_USER` / `SMTP_PASS` | sí | Emails de reservas/contacto |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | sí | Login `/login` |
| `CRON_SECRET` | recomendado | Disparo externo de `/api/scheduled/*` |
| `GOOGLE_PLACES_API_KEY` (+ Place ID / review URL) | opcional | Reseñas en vivo |
| `VITE_GA_MEASUREMENT_ID` | opcional | Analytics (rebuild si cambia) |
| `S3_*` / `AWS_*` | opcional | Sin esto → disco `uploads/` (efímero en PaaS) |

> En PaaS el filesystem es efímero: para documentos persistentes configure S3/R2.

---

## Railway (recomendado)

1. Push de `main` a GitHub.
2. Railway → **New Project** → **Deploy from GitHub** → este repo.
3. **Add Plugin → MySQL**.
4. En el servicio web, Variables:
   - `DATABASE_URL` = referencia al MySQL (`${{MySQL.MYSQL_URL}}` o la que muestre el panel).
   - Resto de la tabla anterior.
5. Build: usa `Dockerfile` (`railway.toml`).
6. Healthcheck: `GET /api/health` (JSON `{ ok, database, storage }`).
7. Abrir la URL generada → `/login` → smoke de reserva + email.
8. Dominio custom: Settings → Domains → `www.tugestionlegal.es` → actualizar DNS (CNAME).
9. Actualizar `PUBLIC_APP_URL` al dominio final y redesplegar si hace falta.

### Cron externo (opcional)

Si el proceso duerme o quiere redundancia:

```http
POST https://www.tugestionlegal.es/api/scheduled/sendReminders
Authorization: Bearer <CRON_SECRET>
```

Mismo patrón para `sendNewsletter`. Los timers internos ya corren cada hora dentro del proceso.

---

## Render (alternativa)

1. Blueprint `render.yaml` o Web Service + Docker.
2. MySQL **externo** (Railway MySQL, Aiven, etc.) → pegar `DATABASE_URL`.
3. Mismas variables; `healthCheckPath: /api/health`.
4. Plan free puede dormir el servicio (cold start).

---

## Checklist post-deploy

- [x] `GET /api/health` → `ok: true` y `database: "ok"` (2026-09-14)
- [x] HTTPS OK (`*.up.railway.app`)
- [x] Home carga
- [x] Login admin (`/login`)
- [x] Crear reserva → fila en `bookings` (email admin pendiente Resend / Pro)
- [x] Confirm/reject por enlace (`/api/booking-action`) — status DB OK; email cliente pendiente de mail HTTPS
- [x] Contacto guarda en DB (`contact.send`)
- [ ] Reseñas Google en dominio custom (Places key cargada; falta DNS)
- [ ] Backup diario de MySQL (ver sección Backup)
- [ ] DNS `www.tugestionlegal.es` → Railway (`DNS_RAILWAY.md`)

### Backup MySQL (Railway)

1. Dashboard → servicio **MySQL** → Backups / Settings (activar si el plan lo permite).
2. Si no hay backups automáticos, dump manual periódico con la URL pública del plugin MySQL:

```bash
mysqldump --uri="$DATABASE_URL" > tgl-backup.sql
```

3. Guardar el dump fuera de Railway (Drive/S3).

---

## Comandos locales de verificación previa

```bash
pnpm install
pnpm check
pnpm test
pnpm build
# Simular prod (con .env y MySQL):
cross-env NODE_ENV=production node dist/index.js
```

---

## Criterio de cierre Fase 3

Sitio en el dominio, reservas y emails en producción, admin por password, **sin** dependencia operativa de Manus Forge.
