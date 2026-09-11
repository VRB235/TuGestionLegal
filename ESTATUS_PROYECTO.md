# Estatus del proyecto — Tu Gestión Legal

**Fecha:** 11 de septiembre de 2026 (actualizado tras Fase 2)  
**Dominio:** `tugestionlegal.es`  
**Repo:** `https://github.com/VRB235/TuGestionLegal`  
**Branch:** `main`

---

## Veredicto

Producto web **muy avanzado**. **Fase 2 cerrada** (independencia operativa de Manus Forge: auth password, storage S3/local, cron propio, Vite limpio).

Pendiente principal: **deploy / dominio** y luego **Stripe (Fase 4)**.

---

## Stack

React 19 · Express · tRPC · Drizzle · MySQL · Nodemailer · Vite · Vitest  
(Origen: plantilla Manus AI; runtime ya no requiere Forge)

---

## Roadmap operativo

| Fase | Descripción | Estado |
|------|-------------|--------|
| **0** | Preparación | ✅ |
| **1** | Arranque local | ✅ |
| **2** | Endurecer (auth, storage, jobs, Vite) | ✅ Cerrada 11/09/2026 |
| **Deploy preliminar** | Railway / Render | 🟡 Archivos listos; checklist vacío |
| **3** | Producción en dominio | ❌ |
| **4** | Pagos Stripe | ❌ |
| **5** | Mejoras post-lanzamiento | ⏳ |

### Fase 2 — entregado

- Storage: S3/R2 o `./uploads` (`server/storage.ts`)
- Jobs: timers internos + `CRON_SECRET` en `/api/scheduled/*`
- Auth: `/login` password; OAuth Manus deshabilitado sin `OAUTH_SERVER_URL`
- Vite: sin plugins Manus
- Stubs Forge legacy (llm, voice, map proxy) sin uso en producto

---

## Estado de este workspace

| Ítem | Estado |
|------|--------|
| Cambios Fase 2 en código | ✅ Aplicados |
| `.env` / `node_modules` / Docker | ⚠️ Pueden faltar en este checkout — restaurar para verificar |

---

## Siguientes pasos

1. `pnpm install` + `.env` (ver `.env.example`: `CRON_SECRET`, `PUBLIC_APP_URL`, admin) + `pnpm test` / `pnpm build`
2. Deploy preliminar Railway **o** Fase 3 (DNS + prod)
3. Fase 4 Stripe cuando haga falta cobro online

---

## Fuentes

- `Plan_Paso_a_Paso_Tu_Gestion_Legal.md`
- `todo.md`
- Código `server/storage.ts`, `server/jobs.ts`, `server/_core/cronAuth.ts`
