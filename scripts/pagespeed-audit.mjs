#!/usr/bin/env node
/**
 * pagespeed-audit.mjs
 * Ejecuta un análisis completo de PageSpeed Insights via API.
 * Uso: npm run pagespeed [url] [mobile|desktop|both]
 *
 * Ejemplos:
 *   npm run pagespeed
 *   npm run pagespeed -- desktop
 *   npm run pagespeed -- https://www.confeccionesliss.com/catalogo mobile
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Cargar variables de entorno desde .env ────────────────────────────────────
function loadEnv() {
  try {
    const envPath = join(__dirname, "..", ".env");
    const content = readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // .env no existe, continuar con variables del sistema
  }
}

loadEnv();

// ── Config ────────────────────────────────────────────────────────────────────
const API_KEY = process.env.PAGESPEED_API_KEY;
const DEFAULT_URL = "https://www.confeccionesliss.com/";

const args = process.argv.slice(2);
let targetUrl = DEFAULT_URL;
let strategy = "both";

for (const arg of args) {
  if (arg.startsWith("http")) targetUrl = arg;
  else if (["mobile", "desktop", "both"].includes(arg)) strategy = arg;
}

if (!API_KEY) {
  console.error("❌ PAGESPEED_API_KEY no encontrada en .env");
  console.error("   Agrégala: PAGESPEED_API_KEY=tu-api-key");
  process.exit(1);
}

// ── Colores ANSI ──────────────────────────────────────────────────────────────
const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
  white: "\x1b[97m",
};

function scoreColor(score) {
  if (score >= 90) return C.green;
  if (score >= 50) return C.yellow;
  return C.red;
}

function scoreEmoji(score) {
  if (score >= 90) return "✅";
  if (score >= 50) return "🟡";
  return "🔴";
}

// ── Fetch con timeout ─────────────────────────────────────────────────────────
async function fetchWithTimeout(url, timeoutMs = 120_000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
}

// ── Audit ─────────────────────────────────────────────────────────────────────
async function runAudit(url, strat) {
  const apiUrl =
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed` +
    `?url=${encodeURIComponent(url)}&strategy=${strat}&category=performance&key=${API_KEY}`;

  console.log(
    `\n${C.cyan}${C.bold}⏳ Analizando ${strat.toUpperCase()} — ${url}${C.reset}`,
  );
  console.log(`${C.gray}   (puede tardar 40–90 segundos...)${C.reset}`);

  const res = await fetchWithTimeout(apiUrl);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      `API error ${res.status}: ${err?.error?.message ?? res.statusText}`,
    );
  }

  const data = await res.json();
  const lhr = data.lighthouseResult;
  const cats = lhr.categories;
  const audits = lhr.audits;

  const score = Math.round((cats.performance?.score ?? 0) * 100);

  // Core Web Vitals
  const metrics = [
    { key: "first-contentful-paint", label: "FCP" },
    { key: "largest-contentful-paint", label: "LCP" },
    { key: "total-blocking-time", label: "TBT" },
    { key: "cumulative-layout-shift", label: "CLS" },
    { key: "speed-index", label: "Speed Index" },
    { key: "interactive", label: "TTI" },
  ];

  // Opportunities con ahorros
  const opportunities = Object.values(audits)
    .filter(
      (a) =>
        a.details?.type === "opportunity" && a.details?.overallSavingsMs > 100,
    )
    .sort(
      (a, b) =>
        (b.details?.overallSavingsMs ?? 0) - (a.details?.overallSavingsMs ?? 0),
    )
    .slice(0, 8);

  // Print
  const sep = "─".repeat(60);
  console.log(`\n${C.bold}${sep}${C.reset}`);
  console.log(
    `${C.bold}  📊 ${strat.toUpperCase()} — ${url}${C.reset}`,
  );
  console.log(`${C.bold}${sep}${C.reset}`);

  const sc = scoreColor(score);
  console.log(
    `\n  ${scoreEmoji(score)} ${C.bold}Performance Score: ${sc}${score}${C.reset}\n`,
  );

  console.log(`${C.bold}  Core Web Vitals:${C.reset}`);
  for (const { key, label } of metrics) {
    const a = audits[key];
    if (!a) continue;
    const val = a.displayValue ?? "n/a";
    const s = a.score ?? 0;
    const color = s >= 0.9 ? C.green : s >= 0.5 ? C.yellow : C.red;
    const dot = s >= 0.9 ? "🟢" : s >= 0.5 ? "🟡" : "🔴";
    console.log(`    ${dot} ${label.padEnd(14)} ${color}${val}${C.reset}`);
  }

  if (opportunities.length > 0) {
    console.log(`\n${C.bold}  Oportunidades de mejora:${C.reset}`);
    for (const opp of opportunities) {
      const saving = opp.details?.overallSavingsMs;
      const savingStr = saving ? `(−${(saving / 1000).toFixed(1)}s)` : "";
      console.log(
        `    ${C.yellow}▸${C.reset} ${opp.title} ${C.gray}${savingStr}${C.reset}`,
      );
    }
  }

  console.log(`\n${C.bold}${sep}${C.reset}\n`);

  return { score, strat };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const strategies =
    strategy === "both" ? ["mobile", "desktop"] : [strategy];
  const results = [];

  for (const strat of strategies) {
    try {
      const r = await runAudit(targetUrl, strat);
      results.push(r);
    } catch (e) {
      console.error(`\n❌ Error en ${strat}: ${e.message}\n`);
    }
  }

  if (results.length > 0) {
    console.log(`${C.bold}  📋 Resumen:${C.reset}`);
    for (const r of results) {
      const sc = scoreColor(r.score);
      console.log(
        `    ${scoreEmoji(r.score)} ${r.strat.padEnd(10)} Score: ${sc}${C.bold}${r.score}${C.reset}`,
      );
    }
    console.log();
  }
}

main().catch((e) => {
  console.error(`\n💥 Error fatal: ${e.message}`);
  process.exit(1);
});
