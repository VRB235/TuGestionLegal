# DNS — www.tugestionlegal.es → Railway

**Estado Railway:** dominio custom `www.tugestionlegal.es` creado en servicio `web`.  
**Apex** (`tugestionlegal.es` sin www): no cabía en el plan Trial (límite 1 custom domain). Usar redirect en Cloudflare: apex → www.

**CDN detectado:** Cloudflare (hoy el CNAME de `www` apunta a `cname.manus.space` — hay que cambiarlo).

## Registros a crear/editar en Cloudflare (zona `tugestionlegal.es`)

| Tipo | Nombre | Contenido / destino | Proxy |
|------|--------|---------------------|--------|
| **CNAME** | `www` | `4osfmedy.up.railway.app` | Preferible **DNS only** (gris) hasta que el cert esté OK; luego se puede probar naranja |
| **TXT** | `_railway-verify.www` | `railway-verify=5dc6d8b65f5b50a498ce2a4b59b2608db92be1df043c36a2697c0f78be941a49` | DNS only |

### Redirect del apex (recomendado)

En Cloudflare → Rules / Redirects o Page Rule:

- `tugestionlegal.es/*` → `https://www.tugestionlegal.es/$1` (301)

(Así no hace falta segundo custom domain en Railway.)

## Tras propagar DNS

1. Comprobar: `https://www.tugestionlegal.es/api/health`
2. `PUBLIC_APP_URL` ya está en `https://www.tugestionlegal.es` (Railway).
3. URL temporal sigue viva: `https://web-production-8a7ae.up.railway.app`

## Comprobar estado

```bash
npx @railway/cli domain status acfa3601-9618-4a7e-91f5-cfb1df0d14bb
```

`verified: true` + certificado válido = listo.
