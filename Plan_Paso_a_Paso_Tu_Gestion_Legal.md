# Plan paso a paso — Tu Gestión Legal

Guía para poner el proyecto en marcha por fases: **local → servidor → pagos**.  
Avanzar en orden y poder pausar entre bloques.

**Proyecto:** `tu-gestion-legal/` (dominio: `tugestionlegal.es`)  
**Stack:** React 19 + Express + tRPC + Drizzle + MySQL + Nodemailer (origen: plantilla Manus AI)

---

## Fase 0 — Preparación (1 sesión corta)

**Objetivo:** saber qué tiene, qué falta y no tocar secretos a ciegas.

### Checklist de estado (actualizado)

| Ítem | Estado | Notas |
|------|--------|-------|
| Carpeta de trabajo `tu-gestion-legal/` | ✅ | Código fuente listo; zips/docs en carpeta padre |
| `.gitignore` protege `.env` | ✅ | Ya incluye `.env` y variantes |
| Plantilla `.env.example` | ✅ | Creada en `tu-gestion-legal/.env.example` |
| `docker-compose.yml` (MySQL 8) | ✅ | Creado; falta arrancar Docker Desktop |
| Node.js 22 | ✅ | v22.23.2 |
| npm | ✅ | 10.9.8 |
| pnpm | ✅ | 10.4.1 (instalado global) |
| Git | ✅ | 2.44.0 |
| Docker CLI | ✅ | 29.7.2 |
| Docker Desktop **en ejecución** | ✅ | Daemon activo |
| Cliente `mysql` en PATH | ❌ | No necesario si se usa Docker |
| `.env` local con secretos | ✅ | SMTP + JWT configurados (dev) |
| `node_modules` | ❌ | Fase 1 (`pnpm install`) |
| MySQL contenedor arriba | ✅ | `tgl-mysql` vía `docker compose up -d` |

### Pasos originales

1. Confirmar que se trabaja sobre `tu-gestion-legal/` (no solo los zips).
2. Leer (sin pegar en chats públicos): `Variables de Entorno y Secretos…` y el `.docx` de secretos.
3. Anotar en un sitio **privado** (gestor de contraseñas / `.env` local no versionado):
   - SMTP (`SMTP_USER`, `SMTP_PASS`)
   - Stripe test (aunque aún no se use)
   - Google Places (si se quieren reseñas/mapa)
   - Datos bancarios solo como referencia de negocio, no en el repo
4. Decidir entorno local:
   - Node **22** (o LTS reciente)
   - **pnpm** (`npm i -g pnpm` si no está instalado)
   - MySQL 8 (Docker o instalador Windows)
5. Crear checklist mental: *sin DB no hay reservas reales; sin SMTP no hay emails; sin OAuth Manus no hay admin “oficial”*.

### Inventario de documentos (carpeta padre)

| Archivo | Uso |
|---------|-----|
| `Variables de Entorno y Secretos — ….md` | Lista de env vars + valores (sensible) |
| `SECRETOS_Y_CONTRASENAS_….docx` | Secretos adicionales (sensible) |
| `Documentación Técnica — ….md` | Arquitectura (parcialmente desfasada re: Stripe) |
| `Análisis SEO — ….md` | SEO / GA pendientes |
| `Informe_Funcional_….docx` | Visión funcional |
| `Plan_Paso_a_Paso_Tu_Gestion_Legal.md` | Este plan |
| `Imagenes/` | Assets locales |
| Zips código/paquete | Backup; no usar como working copy |

### Variables que el código realmente lee

**Obligatorias pronto (Fase 1):** `DATABASE_URL`, `JWT_SECRET`, `SMTP_USER`, `SMTP_PASS`, `NODE_ENV`, `PORT` (opcional).

**Manus (admin/storage/maps; rotas fuera de Manus):** `VITE_APP_ID`, `VITE_OAUTH_PORTAL_URL`, `OAUTH_SERVER_URL`, `OWNER_OPEN_ID`, `BUILT_IN_FORGE_*`, `VITE_FRONTEND_FORGE_*`.

**Más adelante:** `VITE_GA_MEASUREMENT_ID`, Stripe (`STRIPE_*` / `VITE_STRIPE_*` — aún no cableadas en código).

### Pendiente para cerrar Fase 0 (acción humana)

~~1. Abrir **Docker Desktop** y esperar a que el motor esté en verde.~~ ✅  
~~2. En `tu-gestion-legal/`: `docker compose up -d` y comprobar `docker ps` → contenedor `tgl-mysql`.~~ ✅  
~~3. Copiar plantilla: `Copy-Item .env.example .env`~~ ✅ (`.env` creado con SMTP + JWT)  
~~4. Rellenar `.env` con SMTP y JWT de desarrollo.~~ ✅  
5. (Opcional) Anotar Stripe test / Google Places en gestor de contraseñas; no hace falta en `.env` aún.

**Progreso:** ✅ **Fase 0 cerrada** — siguiente: **Fase 1** (`pnpm install`, migraciones, `pnpm dev`).

---

## Deploy preliminar — Railway / Render (antes de Fase 2 formal)

**Objetivo:** URL pública tipo `*.railway.app` / `*.onrender.com` con el monolito completo (no Netlify).

### Archivos añadidos

| Archivo | Uso |
|---------|-----|
| `Dockerfile` | Build Node 22 + `pnpm build` + migrate + start |
| `railway.toml` | Deploy con Docker + healthcheck `/` |
| `render.yaml` | Blueprint Docker (MySQL externo) |
| `.dockerignore` | Acelera build |

### Ajustes de código para cloud

- Escucha en `0.0.0.0` y respeta `PORT` fijo en producción
- Admin: **no** resetea password en cada arranque (solo crea / `ADMIN_RESET_PASSWORD=true`)
- Eliminado script Umami con placeholders rotos en `index.html`
- `pnpm build` verificado OK localmente

### Pasos recomendados — Railway (opción preferida)

1. Subir `tu-gestion-legal/` a un repo GitHub (solo esa carpeta o monorepo con root = app).
2. [railway.app](https://railway.app) → New Project → Deploy from GitHub.
3. Add Plugin → **MySQL**.
4. En el servicio web, Variables:
   - `DATABASE_URL` = referencia a la variable MySQL de Railway (`${{MySQL.MYSQL_URL}}` o la que muestre el panel; si viene como `mysql://`, Drizzle/mysql2 la aceptan).
   - `JWT_SECRET` = string largo aleatorio (nuevo, no el de local)
   - `SMTP_USER` / `SMTP_PASS`
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME`
   - `GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACE_ID` / `GOOGLE_WRITE_REVIEW_URL`
   - `NODE_ENV=production`
5. Deploy. Healthcheck: `GET /`
6. Abrir la URL generada → login `/login` → prueba reserva + email.

### Render (alternativa)

1. Blueprint `render.yaml` o Web Service + Docker.
2. Crear MySQL externo (Railway MySQL, Aiven, etc.) y pegar `DATABASE_URL`.
3. Mismas variables de entorno que arriba.
4. Plan free puede dormir el servicio (cold start).

### Checklist post-deploy

- [ ] Home carga
- [ ] Login admin
- [ ] Crear reserva → email llega
- [ ] Confirm/reject por enlace (dominio Railway, no localhost)
- [ ] Contacto + envío documentos
- [ ] Reseñas Google en Home/Contacto

### Pendiente humano

- Crear cuenta Railway/Render + conectar GitHub
- Rotar secretos de producción (JWT, admin password)
- Restringir API key Places a IPs del host cuando tenga IP fija

---

## Fase 1 — Arranque local (núcleo)

### Checklist de estado (actualizado)

| Ítem | Estado | Notas |
|------|--------|-------|
| `pnpm install` | ✅ | 752+ paquetes; `node_modules` listo |
| `cross-env` en scripts `dev`/`start` | ✅ | Compatible PowerShell/Windows |
| Script `db:migrate` | ✅ | Añadido (solo migrate, sin generate) |
| MySQL `tgl-mysql` healthy | ✅ | Docker compose |
| Migraciones Drizzle | ✅ | 6 tablas + `__drizzle_migrations` |
| `pnpm dev` en :3000 | ✅ | Servidor activo |
| Smoke Home / Reservas / tRPC | ✅ | HTTP 200; `occupiedSlots` OK |
| Reserva de prueba en DB | ✅ | id=1 creada y confirmada |
| Email SMTP reserva | ✅ | MessageId enviado a info@… |
| Admin OAuth Manus | ❌ | Esperado; usar `/api/booking-action` o Fase 1.6 |
| Notificación Manus / Forge | ❌ | Esperado sin `BUILT_IN_FORGE_*` |

### 1.1 Instalación de dependencias

1. Abrir terminal en `tu-gestion-legal/`.
2. Ejecutar `pnpm install`.
3. Si falla por patch de `wouter`, revisar `patches/` y el `pnpm-lock.yaml` (suele resolver con reinstall limpio).

**Criterio:** existe `node_modules/` y `pnpm install` termina sin error. ✅

### 1.2 Adaptar scripts a Windows

Los scripts usan `NODE_ENV=development` estilo Unix. En PowerShell suele fallar.

1. **Opción A (recomendada):** instalar `cross-env` y cambiar scripts:
   - `"dev": "cross-env NODE_ENV=development tsx watch server/_core/index.ts"`
   - `"start": "cross-env NODE_ENV=production node dist/index.js"`
2. **Opción B:** setear `$env:NODE_ENV="development"` y ejecutar `pnpm exec tsx watch server/_core/index.ts`.

**Criterio:** el comando de arranque no muere por sintaxis de env. ✅

### 1.3 Base de datos local

1. Crear DB, p. ej. `tu_gestion_legal`, usuario/password locales.
2. Crear `.env` en `tu-gestion-legal/` (añadir `.env` a `.gitignore` si no está):

```env
DATABASE_URL=mysql://USER:PASS@127.0.0.1:3306/tu_gestion_legal
JWT_SECRET=cambiar-por-string-largo-aleatorio
NODE_ENV=development
```

3. Aplicar esquema:
   - Preferible: `pnpm db:migrate` **o** `pnpm exec drizzle-kit migrate` con `DATABASE_URL` cargada.
4. Verificar tablas: `users`, `bookings`, `contactMessages`, `blogPosts`, `clientDocuments`, `newsletterSubscribers`.

**Criterio:** conexión OK; tablas creadas; el server no loguea “Database not available” al usar reservas. ✅

### 1.4 Primer arranque

1. `pnpm dev` (o el comando Windows equivalente).
2. Abrir `http://localhost:3000` (o el puerto que imprima el log; el código busca desde 3000).
3. Smoke test UI:
   - Home carga
   - Navegación a Asesorías / Packs / Servicios
   - `/reservas` muestra calendario y 2 servicios

**Criterio:** web navegable en local. ✅ — abrir [http://localhost:3000](http://localhost:3000)

### 1.5 Email (SMTP)

1. Añadir al `.env`:
   - `SMTP_USER=info@tugestionlegal.es` (o cuenta de prueba)
   - `SMTP_PASS=` contraseña de aplicación Gmail
2. Crear una reserva de prueba con **su** email.
3. Revisar logs `[Email]` / `[Booking]`.
4. Si no llega: spam, 2FA/app password, o Gmail bloqueando IP.

**Criterio:** email de nueva reserva llega al buzón admin; confirm/reject por enlace (si el `baseUrl` local es correcto) o al menos el envío no falla en log. ✅ (SMTP OK; revisar bandeja/spam de info@)

> Nota: en desarrollo, si no hay header `Origin`, los enlaces de email usan `http://localhost:3000` (ajuste aplicado en `routers.ts`).

### 1.6 Admin sin Manus (bloqueo típico)

Hoy el admin depende de OAuth Manus. Para no quedarse parado:

**Camino mínimo (recomendado en local):**

1. Insertar un usuario admin en MySQL con un `openId` conocido.
2. Crear un bypass de desarrollo **solo si `NODE_ENV=development`**: cookie de sesión firmada con `JWT_SECRET` para ese usuario (middleware o ruta `/api/dev-login`).
3. Probar `/admin/reservas`: listar, confirmar, rechazar.

**Camino alternativo (activo ahora):** gestionar citas por email vía `/api/booking-action?id=&action=confirm|reject`. ✅

**Criterio:** se puede confirmar/rechazar una cita desde panel **o** desde el email. ✅ (vía email/action URL)

### 1.7 Storage / Forge (opcional en esta fase)

Subida de documentos, mapas proxy y notificaciones Manus fallarán sin `BUILT_IN_FORGE_*`.

1. En local: **no bloquear** el resto; documentar “documentos pendientes”. ✅
2. Si se necesita subir archivos ya: stub local (guardar en `uploads/` y servir estático) o S3 real con SDK (más adelante).

**Criterio de cierre Fase 1:**  
`pnpm dev` estable + DB + reserva + email + (admin o flujo email) + lista de “cosas Manus aún rotas”.

**Progreso:** ✅ **Fase 1 núcleo cerrada** (1.1–1.5 + acción email). Opcional pendiente: bypass admin (1.6).

**Cómo arrancar de nuevo otro día:**
1. Abrir Docker Desktop
2. `cd tu-gestion-legal` → `docker compose up -d`
3. `pnpm dev`
4. Abrir http://localhost:3000

---

## Fase 2 — Endurecer local (antes de servidor)

**Progreso:** ✅ **Fase 2 cerrada** (2026-09-11) — storage S3/local, cron propio, auth password, Vite sin Manus.

Trabajar estos ítems uno por uno; cada uno es un PR/commit pequeño.

### 2.1 Inventario de dependencias Manus

| Feature | Estado | Notas |
|---------|--------|-------|
| OAuth admin | ✅ | Login password primario; OAuth callback → 501 si no hay `OAUTH_SERVER_URL` |
| Storage | ✅ | `server/storage.ts`: S3/R2 o `./uploads` (sin Forge) |
| Notificaciones owner | ✅ | Email-first; Forge no-op sin credenciales |
| Heartbeat Manus | ✅ | Timers en proceso + `/api/scheduled/*` con `CRON_SECRET` |
| Maps/Places | ✅ | `googlePlaces.ts` con key directa |
| LLM / image gen / voice / dataApi / map proxy Forge | ⚪ Legacy | Sin uso en rutas de producto; quedan stubs |
| Plugins Vite Manus | ✅ | Eliminados de `vite.config.ts` y deps |

### 2.2 Auth admin propia

1. ~~Definir: 1–2 admins~~ ✅ `ADMIN_EMAIL` / `ADMIN_PASSWORD`
2. ~~Login email + password~~ ✅ `/login` + hash
3. ~~`role = admin`~~ ✅
4. ~~Proteger `adminProcedure`~~ ✅
5. ~~Eliminar dependencia de `OAUTH_SERVER_URL` en prod~~ ✅

### 2.3 Storage propio

1. ~~Bucket S3/R2 o local~~ ✅ Local por defecto; S3 si hay `S3_BUCKET` + AWS keys
2. ~~Sustituir `storagePut`/`storageGet`~~ ✅
3. ~~Variables~~ ✅ en `.env.example`

### 2.4 Jobs sin Manus

1. ~~Verificar intervalos~~ ✅ `startInternalJobTimers()` (reminders hourly; newsletter lun 09:00 Madrid)
2. ~~Cron HTTP protegido~~ ✅ `CRON_SECRET` (`Authorization: Bearer` / `x-cron-secret`)

### 2.5 Limpieza de build

1. `pnpm check` / `pnpm test` / `pnpm build` — verificar tras cambios
2. ~~Quitar plugins Manus~~ ✅

**Criterio de cierre Fase 2:** app arranca en modo production local **sin** credenciales Forge; admin propio; storage opcional pero definido. ✅

---

## Fase 3 — Despliegue en servidor

### 3.1 Elegir hosting

Opciones razonables:

- **VPS** (Hetzner, Contabo, DigitalOcean): control total, barato, más ops.
- **PaaS** (Railway, Render, Fly.io): más rápido si no se quiere administrar Linux.

Requisitos: Node 22, MySQL gestionado o en el mismo VPS, HTTPS, proceso persistente (o cron externo).

### 3.2 Preparar producción

1. Dominio `tugestionlegal.es` → DNS A/CNAME al servidor.
2. TLS (Caddy/Nginx + Let’s Encrypt).
3. `.env` de producción (valores reales, no test):
   - `DATABASE_URL`
   - `JWT_SECRET` (nuevo, no el de local)
   - `SMTP_*`
   - Auth admin / S3
   - `NODE_ENV=production`
4. Migraciones en la DB de prod (mismo esquema).
5. Seed: usuario admin + 1–3 posts de blog si la DB viene vacía (las imágenes CDN Manus pueden seguir funcionando mientras el CDN viva).

### 3.3 Deploy pipeline mínimo

1. Build en CI o en el server: `pnpm install --frozen-lockfile && pnpm build`.
2. Arranque con PM2/systemd: `node dist/index.js` (o `pnpm start`).
3. Reverse proxy → puerto interno.
4. Healthcheck: home + un endpoint tRPC simple.

### 3.4 Checklist post-deploy

- [ ] HTTPS OK
- [ ] Formulario contacto envía email
- [ ] Reserva crea fila en `bookings`
- [ ] Email admin con enlaces al **dominio real** (`tugestionlegal.es`)
- [ ] Confirm/reject actualiza status y avisa al cliente
- [ ] Admin login en prod
- [ ] WhatsApp / redes / GA (cuando exista `VITE_GA_MEASUREMENT_ID`)
- [ ] Backup diario de MySQL

### 3.5 Contenido e imágenes

1. Inventariar URLs CloudFront Manus en `image-urls*.txt` / código.
2. Plan B: subir a bucket/CDN propio y reemplazar URLs cuando Manus deje de servirlas.
3. Foto en `/manus-storage/...` → migrar sí o sí.

**Criterio de cierre Fase 3:** sitio en el dominio, reservas y emails en producción, sin dependencia operativa de Manus.

---

## Fase 4 — Pagos (Stripe)

Hacerlo **después** de que reservas + email + admin estén estables en prod (o al menos en un staging).

> **Importante:** la documentación menciona Stripe integrado, pero **en el código actual no hay referencias a Stripe**. Los pagos online están desactivados / se gestionan aparte. Esta fase es integración **nueva**.

### 4.1 Decisión de producto

Definir con la titular del negocio:

1. ¿Se paga **solo** asesorías online (45€ / 60€)?
2. ¿Packs/trámites = presupuesto manual (transferencia/PayPal) por ahora?
3. ¿Flujo A o B?
   - **A (recomendado):** Checkout Stripe → webhook confirma → crea/confirma reserva.
   - **B:** Reserva `pending` → link de pago → al pagar pasa a `confirmed`.

Recomendación: **A** para asesorías de precio fijo (menos no-shows).

### 4.2 Cuenta Stripe

1. Cuenta Stripe de la titular del negocio (España).
2. Modo **test** primero.
3. Productos/precios: Videoconferencia y Inmobiliaria (alineados con `shared/data.ts`; la doc hablaba de 47/63 con IVA — **cerrar precio final**).
4. Variables:
   - `STRIPE_SECRET_KEY`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`

### 4.3 Modelo de datos

Añadir a `bookings` (migración nueva), por ejemplo:

- `paymentStatus`: `unpaid | paid | refunded | failed`
- `stripeSessionId` / `stripePaymentIntentId`
- `amountCents`, `currency` (`eur`)

No reutilizar solo `status` de cita para pagos: son dos máquinas de estado distintas (`pending/confirmed/cancelled` vs pago).

### 4.4 Implementación por pasos pequeños

1. Instalar `stripe` (server) + Stripe.js en client si se usa Elements; con **Checkout** basta redirect.
2. Endpoint/procedimiento tRPC: `createCheckoutSession({ serviceType, date, time, name, email, phone })`:
   - Validar slot libre
   - Crear sesión Stripe con `metadata` (servicio, fecha, hora, email)
   - Opcional: crear booking `pending` + `paymentStatus=unpaid` antes del redirect
3. Página éxito `/reservas/exito` y cancelación `/reservas/cancelado`.
4. Webhook `checkout.session.completed`:
   - Verificar firma
   - Idempotencia (no duplicar si Stripe reintenta)
   - Marcar pagado + confirmar cita (o crear booking si aún no existía)
   - Email admin + email cliente
5. Actualizar textos legales (`CondicionesContratacion`: quitar “pagos online desactivados”).
6. Quitar/ajustar el copy de Reservas: “los pagos se gestionan por separado”.

### 4.5 Pruebas

1. Tarjeta test `4242…` → pago OK → fila en DB `paid` + email.
2. Tarjeta rechazo → no confirma cita / no ocupa slot de forma incorrecta.
3. Doble clic / webhook duplicado → una sola reserva.
4. Slot ocupado entre Checkout y pago → mensaje claro / reembolso manual o automático.
5. Solo entonces: claves **live** + webhook en dominio real.

### 4.6 Operativa post-pago

1. Panel admin: ver si está pagado.
2. Política de cancelación/reembolso (manual al inicio está bien).
3. Factura: Stripe invoices o proceso manual (gestoría).

**Criterio de cierre Fase 4:** en test, una asesoría se reserva solo tras pago; webhook fiable; textos legales alineados.

---

## Fase 5 — Mejoras posteriores (cuando el núcleo esté vivo)

Orden sugerido, no bloqueante:

1. Google Analytics + Search Console + `sitemap.xml`.
2. Meta title/description por página.
3. Migración definitiva de imágenes a CDN propio.
4. Pagos de packs (precio fijo) o “solicitud de presupuesto”.
5. Recordatorios SMS/WhatsApp (opcional).
6. Calendario Google API real (hoy es link `calendar.google.com/render`).

---

## Ritmo práctico (sesiones)

| Sesión | Entregable |
|--------|------------|
| 1 | Fase 0 + 1.1–1.4 (instala, DB, home en local) |
| 2 | 1.5–1.6 (email + admin bypass o email-actions) |
| 3 | 2.1–2.2 (inventario Manus + auth propia) |
| 4 | 2.3–2.5 (storage + build/test production local) |
| 5–6 | Fase 3 (DNS, deploy, checklist prod) |
| 7–9 | Fase 4 (Stripe test → webhook → live) |

Al terminar cada sesión: anotar *qué funciona / qué sigue roto / qué secreto se usó*. Evita rehacer diagnóstico.

---

## Riesgos a tener presentes

1. **Doc desactualizada** (Stripe “ya integrado” → no está en el código).
2. **Secretos en markdown**: rotar si el archivo circuló.
3. **Imágenes Manus CDN**: pueden dejar de servir; plan de migración.
4. **Windows + scripts Unix**: resolver en la sesión 1.
5. **Precio 45/60 vs 47/63**: alinear negocio + IVA antes de Stripe live.

---

## Próximo paso concreto

**Fase 2 cerrada.** Siguiente: **deploy preliminar** (Railway) o **Fase 3** (dominio + prod), luego **Fase 4** (Stripe).
