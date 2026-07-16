import { readFileSync } from "fs";

try {
  const data = JSON.parse(readFileSync("pagespeed-mobile-latest.json", "utf8"));
  const items = data.lighthouseResult.audits["network-requests"]?.details?.items ?? [];
  
  console.log("=== NETWORK REQUESTS ===");
  items.forEach(i => {
    const startSec = (i.networkRequestTime / 1000).toFixed(2);
    const endSec = (i.networkEndTime / 1000).toFixed(2);
    const durSec = ((i.networkEndTime - i.networkRequestTime) / 1000).toFixed(2);
    const sizeKb = ((i.transferSize ?? 0) / 1024).toFixed(1);
    console.log(`[${startSec}s - ${endSec}s] (${durSec}s) ${sizeKb} KB [${i.resourceType}] - ${i.url}`);
  });
} catch (e) {
  console.error("Error:", e.message);
}
