# Migración a Raiola Networks — Tu Gestión Legal

**Decisión:** Hosting Code / Node.js (plan básico: 2 GB RAM, 50 GB NVMe, 150 % CPU).  
**Dominio:** ya en IONOS (`www.tugestionlegal.es`). No incluir dominio en la contratación salvo oferta anual.  
**Estrategia BD:** **limpia** (sin dump de Railway). Schema con `drizzle-kit migrate`; admin con `ADMIN_*` al arranque.  
**Estado:** contratación + deploy en curso (2026-11-10). Railway queda como legado / apagar tras corte DNS.

Stack: Express + Vite SPA + MySQL + Stripe + SMTP + cron interno.  
Node requerido: **>= 22** (`package.json` engines).

Plantilla env: [`.env.raiola.example`](./.env.raiola.example)  
Script deploy SSH: [`scripts/deploy-raiola.sh`](./scripts/deploy-raiola.sh)  
Smoke HTTP: `node scripts/smoke-raiola.mjs https://URL_BASE`  
Manual cliente (contratar): [`MANUAL_CLIENTE_CONTRATAR_RAIOLA.md`](./MANUAL_CLIENTE_CONTRATAR_RAIOLA.md)

---

## 0. Contratar

1. Abrir https://raiolanetworks.com/hosting-nodejs/
2. Configurar (o plan “Para crecer” ≈ **27,20 €/mes** + IVA):
   - CPU **150 %**
   - RAM **2 GB (2048 MB)**
   - Disco **50 GB** NVMe
   - Periodo **mensual** (validar; luego anual)
3. Pulsar **Contratar** → en dominio elegir  
   **«Yo tengo mi dominio que no quiero transferir…»** → `tugestionlegal` + `es` → **Usar** → **Continuar**.
4. Completar registro/login + pago (**PayPal o tarjeta** activan al momento; transferencia/SEPA retrasan).
5. Anotar: cPanel, SSH, MySQL, correo, URL temporal del hosting.
6. **No mover el DNS** hasta smoke OK en la URL temporal.

> El carrito WHMCS a veces se vacía si se salta el paso de dominio; conviene completar el flujo en un solo navegador sin refrescar a medias.

Checklist contratación:

- [ ] Pedido pagado / cuenta activa
- [ ] Acceso cPanel OK
- [ ] SSH OK
- [ ] URL temporal anotada
- [ ] DNS **sin** cambios

---

## 1. Correo (Google — no Raiola)

**Decisión cliente (2026-11):** `info@tugestionlegal.es` vive en **Google** (Gmail + Calendar).  
**No** crear ese buzón en Raiola. Al cortar DNS: **preservar MX de Google** (no apuntar correo al hosting).

Opciones SMTP para la app:

1. **Google Workspace / Gmail** con contraseña de aplicación → `SMTP_USER` / `SMTP_PASS` (smtp.gmail.com:587).
2. **Resend** (o similar) con dominio verificado → `RESEND_API_KEY` + `EMAIL_FROM`.

Checklist correo:

- [x] Correo de producto en Google (no crear en Raiola)
- [ ] Credenciales SMTP (app password Google) o Resend para la app
- [ ] Al corte DNS: MX Google intactos (no nameservers Raiola a ciegas si rompen MX; preferir registros A/CNAME en IONOS)

---

## 2. Base de datos (limpia)

1. En cPanel: crear base MySQL + usuario con privilegios.
2. Armar `DATABASE_URL`:

   ```text
   mysql://USUARIO:PASSWORD@localhost:3306/NOMBRE_BD
   ```

3. **No importar Railway.** BD vacía.
4. Tras deploy: `pnpm exec drizzle-kit migrate` (o `scripts/deploy-raiola.sh`).
5. Admin: se crea al boot con `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME`.

Checklist BD:

- [ ] BD + usuario creados
- [ ] `DATABASE_URL` en `.env` del servidor
- [ ] Migraciones aplicadas
- [ ] Login admin OK tras primer arranque

---

## 3. Desplegar la aplicación

Notas operativas (CODE1100):

- SSH `:22` suele estar cerrado; usar FTP + Terminal/cron de cPanel.
- En el host conviene **build local** + subir `dist/` (evita OOM con `pnpm install` completo).
- El bundle de producción **no** debe importar `vite` (`server/_core/vite.dev.ts` solo en desarrollo; `esbuild --define:process.env.NODE_ENV=production`).
- URL temporal `miurltemporal.com/main/...`: el front normaliza el prefijo `/main/<dominio>` para rutas y tRPC. Tras el corte DNS al dominio raíz, el mismo build con `base: /` sirve.

1. Subir código (Git + SSH, o Application Manager / Setup Node.js de cPanel).
2. Selector Node: **22.x** o superior (en CODE1100 se usó 24.x Production).
3. En el directorio del proyecto:

   ```bash
   # Opción A — script
   bash scripts/deploy-raiola.sh

   # Opción B — manual
   corepack enable
   pnpm install --frozen-lockfile
   pnpm build
   pnpm exec drizzle-kit migrate
   ```

4. Arranque producción:

   ```bash
   pnpm start
   # o: NODE_ENV=production node dist/index.js
   ```

   En Setup Node.js App: application root = carpeta del repo; startup file = `dist/index.js`; variables desde `.env` / panel.

5. Proxy / documento raíz según LiteSpeed + **HTTPS** (Let’s Encrypt en cPanel).
6. Healthcheck: `GET /api/health` → `{ ok: true, database: "ok" }`.

> El `Dockerfile` del repo es para Railway/Render. En Raiola Code: **sin Docker**.

Checklist deploy:

- [ ] Código en servidor
- [ ] Node 22 + pnpm
- [ ] `.env` desde `.env.raiola.example`
- [ ] `pnpm build` OK
- [ ] Migraciones OK
- [ ] Proceso escuchando + HTTPS
- [ ] `/api/health` OK

---

## 4. Variables de entorno

Definir en el panel / `.env` de producción (no versionar secretos). Ver `.env.raiola.example`.

| Variable | Notas |
|----------|--------|
| `DATABASE_URL` | MySQL Raiola (`localhost`) |
| `JWT_SECRET` | String largo **nuevo** (no reutilizar de entornos expuestos) |
| `NODE_ENV` | `production` |
| `PORT` | El que asigne Setup Node.js |
| `PUBLIC_APP_URL` | URL temporal → luego `https://www.tugestionlegal.es` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | Login `/login` |
| `SMTP_USER` / `SMTP_PASS` | Cuenta de correo Raiola |
| `EMAIL_FROM` | p. ej. `Tu Gestión Legal <info@tugestionlegal.es>` |
| `ADMIN_NOTIFY_EMAIL` | Opcional |
| `STRIPE_SECRET_KEY` | Test o live |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Requiere **rebuild** si cambia |
| `STRIPE_WEBHOOK_SECRET` | Tras crear webhook (temp o dominio final) |
| `CRON_SECRET` | Para `/api/scheduled/*` si usan cron externo |
| `GOOGLE_PLACES_API_KEY` (+ Place ID / review URL) | Si aplica |

---

## 5. Smoke en URL Raiola (DNS aún sin tocar)

```bash
node scripts/smoke-raiola.mjs https://URL_TEMPORAL_RAIOLA
```

Manual:

- [ ] `GET /api/health`
- [ ] Home y páginas estáticas
- [ ] Login admin (`/login`)
- [ ] Crear reserva → fila en BD
- [ ] Stripe test (Checkout + webhook a URL temporal, o Stripe CLI)
- [ ] Email de contacto / reserva por SMTP Raiola
- [ ] Subida de documentos (`uploads/` **persiste** en este hosting)

---

## 6. DNS (IONOS) — corte controlado

1. Anotar el destino que indique Raiola para `www` (CNAME o A).
2. En IONOS: cambiar CNAME/A de `www` **desde Railway → Raiola**.
3. Ajustar **MX** (y SPF/DKIM) si el correo pasa a Raiola.
4. Actualizar `PUBLIC_APP_URL=https://www.tugestionlegal.es` y reiniciar.
5. **Stripe** → Webhooks:  
   `https://www.tugestionlegal.es/api/stripe/webhook`  
   Eventos: `checkout.session.completed`, `checkout.session.expired`.  
   Guardar el nuevo `whsec_…` en `STRIPE_WEBHOOK_SECRET`.
6. Comprobar TLS y `https://www.tugestionlegal.es/api/health`.
7. Redirect apex `tugestionlegal.es` → `https://www.tugestionlegal.es` (si aún no está).

Checklist DNS/Stripe:

- [ ] `www` apunta a Raiola
- [ ] TLS válido
- [ ] Health en dominio final
- [ ] Webhook Stripe actualizado
- [ ] MX/SPF/DKIM si aplica

---

## 7. Cierre y operación

1. Cron cPanel (opcional):

   ```http
   POST https://www.tugestionlegal.es/api/scheduled/sendReminders
   Authorization: Bearer <CRON_SECRET>
   ```

   Igual para `sendNewsletter`. Los timers internos del proceso ya corren cada hora.

2. Activar **backups** MySQL / cPanel.
3. Si Railway aún existe: 48–72 h en paralelo → pausar/eliminar.
4. Actualizar `ESTATUS_PROYECTO.md` con fechas y URL real.

---

## Orden resumido

```text
Contratar
  → Correo + MySQL limpio
  → Deploy + variables (.env.raiola.example)
  → Smoke (scripts/smoke-raiola.mjs + manual)
  → DNS IONOS + webhook Stripe
  → Backups + apagar Railway
```

---

## Referencias

- App / Railway legacy: `DEPLOY.md`
- DNS IONOS: `DNS_RAILWAY.md` (actualizar destinos al migrar)
- Email: `EMAIL_RESEND.md` (alternativa; prioridad SMTP Raiola)
- Stripe: `STRIPE.md`
- Backup Railway: `BACKUP_RAILWAY.md` (equivalente en cPanel Raiola)
