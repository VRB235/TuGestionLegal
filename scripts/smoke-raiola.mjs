#!/usr/bin/env node
/**
 * Smoke mínimo post-deploy Raiola (URL temporal o dominio final).
 * Uso: node scripts/smoke-raiola.mjs https://URL_BASE
 */
const base = (process.argv[2] || "").replace(/\/$/, "");
if (!base) {
  console.error("Uso: node scripts/smoke-raiola.mjs https://URL_BASE");
  process.exit(1);
}

async function check(path, opts = {}) {
  const url = `${base}${path}`;
  const res = await fetch(url, {
    redirect: "manual",
    ...opts,
  });
  const text = await res.text().catch(() => "");
  return { url, status: res.status, text: text.slice(0, 400) };
}

const results = [];
let failed = 0;

try {
  const health = await check("/api/health");
  let bodyOk = false;
  try {
    const j = JSON.parse(health.text);
    bodyOk = j.ok === true && j.database === "ok";
  } catch {
    bodyOk = false;
  }
  const ok = health.status === 200 && bodyOk;
  results.push({ name: "GET /api/health", ok, detail: `${health.status} ${health.text}` });
  if (!ok) failed++;
} catch (e) {
  results.push({ name: "GET /api/health", ok: false, detail: String(e) });
  failed++;
}

try {
  const home = await check("/");
  const ok = home.status >= 200 && home.status < 400;
  results.push({ name: "GET /", ok, detail: `status ${home.status}` });
  if (!ok) failed++;
} catch (e) {
  results.push({ name: "GET /", ok: false, detail: String(e) });
  failed++;
}

try {
  const login = await check("/login");
  const ok = login.status >= 200 && login.status < 400;
  results.push({ name: "GET /login", ok, detail: `status ${login.status}` });
  if (!ok) failed++;
} catch (e) {
  results.push({ name: "GET /login", ok: false, detail: String(e) });
  failed++;
}

for (const r of results) {
  console.log(`${r.ok ? "OK" : "FAIL"}  ${r.name} — ${r.detail}`);
}

console.log(
  failed
    ? `\nSmoke incompleto (${failed} fallos). Completar manual: reserva, Stripe test, email SMTP, uploads.`
    : `\nHTTP básico OK. Completar manual: login admin, reserva→BD, Stripe test, email SMTP, uploads.`
);
process.exit(failed ? 1 : 0);
