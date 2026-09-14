# Email en Railway — Resend (HTTPS)

Railway **Trial/Hobby bloquea SMTP** (puertos 25/465/587). Por eso Gmail SMTP falla con `Connection timeout`.

Solución: **Resend** (API HTTPS, puerto 443).

## Pasos (5–10 min)

1. Crear cuenta: https://resend.com/signup  
2. **API Keys** → Create → copiar `re_...`  
3. (Recomendado) **Domains** → Add `tugestionlegal.es` → añadir los DNS que indique Resend en Cloudflare  
4. Hasta verificar el dominio, puede usar remitente de prueba:  
   `EMAIL_FROM=Tu Gestión Legal <beth.t@example.com>`  
   (solo envía al email de la cuenta Resend en el plan free de onboarding)

5. En Railway → servicio `web` → Variables:

```text
RESEND_API_KEY=re_xxxxxxxx
EMAIL_FROM=Tu Gestión Legal <info@tugestionlegal.es>
ADMIN_NOTIFY_EMAIL=info@tugestionlegal.es
```

6. Redeploy (o dejar que Railway redeploye al setear vars).

7. Probar una reserva y revisar bandeja de `info@tugestionlegal.es` (y spam).

## Prioridad de drivers en el código

1. Si hay `RESEND_API_KEY` → Resend  
2. Si no, `SMTP_USER` + `SMTP_PASS` → Gmail (solo útil en local)  
3. Si no → emails desactivados (la reserva igual se crea)
