import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
  } catch {}
}

loadEnv();

const API_KEY = process.env.PAGESPEED_API_KEY;
const targetUrl = "https://www.confeccionesliss.com/";

async function run() {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=desktop&category=performance&key=${API_KEY}`;
  console.log("⏳ Fetching desktop PageSpeed data from Google API...");
  
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }
  
  const data = await res.json();
  writeFileSync("pagespeed-desktop-latest.json", JSON.stringify(data, null, 2));
  console.log("✅ Saved JSON to pagespeed-desktop-latest.json");
  
  const audits = data.lighthouseResult.audits;
  console.log("=== DESKTOP CORE METRICS ===");
  console.log("Score:", Math.round(data.lighthouseResult.categories.performance.score * 100));
  console.log("FCP:", audits["first-contentful-paint"].displayValue);
  console.log("LCP:", audits["largest-contentful-paint"].displayValue);
  console.log("TBT:", audits["total-blocking-time"].displayValue);
  console.log("Speed Index:", audits["speed-index"].displayValue);
}

run().catch(console.error);
