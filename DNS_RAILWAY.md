# DNS — www.tugestionlegal.es → Railway (IONOS)

**Registrador DNS:** IONOS (no Cloudflare).  
**Estado (23-sep-2026):** dominio verificado, certificado **válido**, `https://www.tugestionlegal.es/api/health` → 200.

## Registro actual en IONOS

| Tipo | Nombre | Contenido / destino |
|------|--------|---------------------|
| **CNAME** | `www` | Preferible: `a5p3tnti.up.railway.app` (destino Railway actual) |

Si en IONOS aún figura `4osfmedy.up.railway.app` y el sitio abre bien, puede actualizar al valor nuevo cuando le convenga (Railway lo marca como requerido).

TXT `_railway-verify.www` ya no es crítico (dominio **verified: true**); puede dejarlo o borrarlo.

### Redirect del apex (recomendado)

En IONOS → Redirects / Reenvíos:

- `tugestionlegal.es` → `https://www.tugestionlegal.es` (301)

(Plan Trial: solo 1 custom domain en Railway = `www`.)

## Variables

- `PUBLIC_APP_URL=https://www.tugestionlegal.es` (Railway)
- URL temporal: `https://web-production-8a7ae.up.railway.app`

## Comprobar

```bash
npx @railway/cli domain status www.tugestionlegal.es --service web
curl -sS https://www.tugestionlegal.es/api/health
```

`verified: true` + `CERTIFICATE_STATUS_TYPE_VALID` = listo.

Si el navegador aún muestra `ERR_CERT_COMMON_NAME_INVALID` por HSTS antiguo: cierre pestañas, espere 1–2 min o pruebe ventana privada.
