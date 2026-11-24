#!/usr/bin/env bash
# Deploy en Raiola Hosting Code (sin Docker). Ejecutar por SSH en el directorio del proyecto.
# Requisitos: Node >= 22, corepack/pnpm, .env con DATABASE_URL y resto (ver .env.raiola.example).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  echo "Falta .env — copiar .env.raiola.example y rellenar antes de continuar." >&2
  exit 1
fi

# shellcheck disable=SC1091
set -a
source .env
set +a

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "DATABASE_URL vacío en .env" >&2
  exit 1
fi

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if [[ "$NODE_MAJOR" -lt 22 ]]; then
  echo "Se requiere Node >= 22 (engines del package.json). Actual: $(node -v)" >&2
  echo "En cPanel Setup Node.js App, seleccionar Node 22.x" >&2
  exit 1
fi

echo "==> corepack / pnpm"
corepack enable
corepack prepare pnpm@latest --activate

echo "==> pnpm install --frozen-lockfile"
pnpm install --frozen-lockfile

echo "==> pnpm build"
pnpm build

echo "==> drizzle-kit migrate (BD limpia / schema al día)"
pnpm exec drizzle-kit migrate

echo "==> listo. Arranque producción:"
echo "    pnpm start"
echo "  o Application Manager / Setup Node.js:"
echo "    startup: dist/index.js   (NODE_ENV=production)"
echo "  Healthcheck: GET /api/health"
