# Backup MySQL — Railway

Railway no expone backup automático fiable en todos los planes Trial. Opciones:

## Opción A — Panel Railway (recomendada)

1. Proyecto → servicio **MySQL** → pestaña **Backups** / **Data**.
2. Activar backups si el plan lo permite, o exportar volumen periódicamente.
3. Alternativa: **Connect** → copiar `DATABASE_URL` (solo la pública si existe) y volcar desde su PC:

```bash
# Desde máquina con acceso a la URL pública MySQL (si Railway la expone)
mysqldump -h <host> -u <user> -p <database> > backup-$(date +%Y%m%d).sql
```

En Trial a menudo solo hay host **interno** (`mysql.railway.internal`). En ese caso:

## Opción B — One-off desde un servicio Railway

Crear un job/cron en el mismo proyecto que ejecute `mysqldump` hacia un bucket S3/R2, o descargar el dump vía `railway run` si el CLI tiene red privada al MySQL.

```bash
npx @railway/cli run --service web -- mysqldump --help
```

(requiere cliente `mysqldump` en la imagen; hoy la imagen Node no lo incluye — añadir solo si quieren automatizar).

## Opción C — Manual semanal (mínimo viable)

1. Railway → MySQL → **Data** / Query o cliente GUI (TablePlus, DBeaver) con TCP proxy de Railway.
2. Export SQL completo.
3. Guardar fuera de Railway (Drive/NAS cifrado).

**Criterio de cierre:** al menos un dump restaurable guardado fuera de la plataforma + nota de frecuencia (semanal).
