// scratch/parse-pagespeed.mjs
import { readFileSync } from "fs";

const content = readFileSync("pagespeed-full-response.json", "utf8");
const data = JSON.parse(content);
const audits = data.lighthouseResult.audits;

console.log("=== LCP Metric Element ===");
const lcpElem = audits["largest-contentful-paint-element"];
console.log(JSON.stringify(lcpElem?.details?.items, null, 2));

console.log("\n=== LCP Audit Details ===");
const lcpAudit = audits["largest-contentful-paint"];
console.log("LCP displayValue:", lcpAudit?.displayValue);
console.log("LCP numericValue:", lcpAudit?.numericValue);

const lcpBreakdown = lcpElem?.details?.items?.[0];
if (lcpBreakdown) {
  console.log("LCP Phase Breakdown:");
  console.log("  TTFB:", lcpBreakdown.ttfb, "ms");
  console.log("  Load Delay:", lcpBreakdown.loadDelay, "ms");
  console.log("  Load Time:", lcpBreakdown.loadDuration, "ms");
  console.log("  Render Delay:", lcpBreakdown.renderDelay, "ms");
}

console.log("\n=== Render Blocking Resources ===");
console.log(JSON.stringify(audits["render-blocking-resources"]?.details?.items, null, 2));

console.log("\n=== Unused JS ===");
console.log(JSON.stringify(audits["unused-javascript"]?.details?.items, null, 2));

console.log("\n=== Opportunities ===");
for (const [name, audit] of Object.entries(audits)) {
  const details = audit.details;
  if (details && (details.overallSavingsMs > 0 || details.overallSavingsBytes > 0)) {
    console.log(`- ${name}: savingsMs=${details.overallSavingsMs || 0}, savingsBytes=${details.overallSavingsBytes || 0}, score=${audit.score}`);
  }
}
