// check-perf-v2.mjs
import https from "https";
const API_KEY = "AIzaSyCIRUhEx9k6heHX0nJKzNg2JJCPu5-q4mg";
const URL_TARGET = "https://www.confeccionesliss.com/";

function fetchPS(strategy) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(URL_TARGET)}&strategy=${strategy}&key=${API_KEY}&category=performance`;
    https.get(apiUrl, (res) => {
      let data = "";
      res.on("data", (d) => (data += d));
      res.on("end", () => { try { resolve(JSON.parse(data)); } catch(e){ reject(e); } });
    }).on("error", reject);
  });
}

function extract(result, strategy) {
  const cats = result.lighthouseResult?.categories || {};
  const audits = result.lighthouseResult?.audits || {};
  const score = Math.round((cats.performance?.score ?? 0) * 100);
  const lcp = audits["largest-contentful-paint"];
  const fcp = audits["first-contentful-paint"];
  const tbt = audits["total-blocking-time"];
  const cls = audits["cumulative-layout-shift"];
  const si  = audits["speed-index"];
  const renderBlock = audits["render-blocking-resources"];
  const unusedJs = audits["unused-javascript"];

  console.log(`\n========== ${strategy.toUpperCase()} ==========`);
  console.log(`Score:  ${score}/100`);
  console.log(`LCP:    ${lcp?.displayValue ?? "n/a"}  (score: ${Math.round((lcp?.score ?? 0)*100)})`);
  console.log(`FCP:    ${fcp?.displayValue ?? "n/a"}  (score: ${Math.round((fcp?.score ?? 0)*100)})`);
  console.log(`TBT:    ${tbt?.displayValue ?? "n/a"}  (score: ${Math.round((tbt?.score ?? 0)*100)})`);
  console.log(`CLS:    ${cls?.displayValue ?? "n/a"}  (score: ${Math.round((cls?.score ?? 0)*100)})`);
  console.log(`SI:     ${si?.displayValue ?? "n/a"}   (score: ${Math.round((si?.score ?? 0)*100)})`);

  const rbItems = renderBlock?.details?.items ?? [];
  if (rbItems.length === 0) {
    console.log(`\n✅ Sin render-blocking resources`);
  } else {
    console.log(`\nRender-blocking (${rbItems.length}):`);
    rbItems.forEach(i => console.log(`  ${String(i.url).split("/").pop()}  ${i.wastedMs}ms  ${Math.round(i.totalBytes/1024)}KB`));
  }

  const ujItems = (unusedJs?.details?.items ?? []).slice(0, 3);
  if (ujItems.length > 0) {
    console.log(`Top unused JS:`);
    ujItems.forEach(i => console.log(`  ${String(i.url).split("/").pop()}  ${Math.round(i.wastedBytes/1024)}KB`));
  }
  return score;
}

console.log(`Checking PageSpeed: ${URL_TARGET}`);
console.log(`Time: ${new Date().toISOString()}`);
const [mobile, desktop] = await Promise.all([fetchPS("mobile"), fetchPS("desktop")]);
const m = extract(mobile, "mobile");
const d = extract(desktop, "desktop");
console.log(`\n📊 Mobile: ${m}/100  |  Desktop: ${d}/100`);
console.log(m >= 95 ? "✅ OBJETIVO ≥95 ALCANZADO" : `⚠️  Faltan ${95-m} pts para mobile 95`);
