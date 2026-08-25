# Deploy image for Railway / Render / any Docker host
FROM node:22-bookworm-slim

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

ENV NODE_ENV=production
EXPOSE 3000

# Migrate schema then start the monolith (API + static SPA)
CMD ["sh", "-c", "pnpm exec drizzle-kit migrate && node dist/index.js"]
