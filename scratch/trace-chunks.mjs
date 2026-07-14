import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const targetChunks = [
  "36n_q9yrx0qyw",
  "3655-4en3g23u",
  "2xz_e36l79mfx"
];

// Let's inspect the files in .next/static/chunks to see if we can find matches or files containing references.
console.log("=== Checking chunk files in .next/static/chunks/ ===");
const chunksDir = ".next/static/chunks";

function scanDir(dir) {
  let files = [];
  try {
    const list = readdirSync(dir);
    for (const file of list) {
      const fullPath = join(dir, file);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        files = files.concat(scanDir(fullPath));
      } else {
        files.push(fullPath);
      }
    }
  } catch (e) {
    console.error("Error reading dir:", dir, e.message);
  }
  return files;
}

const allFiles = scanDir(chunksDir);
console.log(`Found ${allFiles.length} files in chunks directory.`);

// Let's search inside these files for recognizable keywords
const keywords = [
  "supabase", "zod", "framer", "motion", "useCart", "useAuth", "Toaster", "react-hot-toast", "phantom-ui",
  "GoogleReviews", "FaqSection", "ServiciosPrincipales", "Navbar", "Footer", "MobileBottomNav", "SearchModal",
  "FavoritesModal", "CookieBanner"
];

for (const chunk of targetChunks) {
  const matchingFile = allFiles.find(f => f.includes(chunk));
  if (matchingFile) {
    const sizeKb = (statSync(matchingFile).size / 1024).toFixed(1);
    console.log(`\nChunk: ${chunk} -> Found file: ${matchingFile} (${sizeKb} KB)`);
    try {
      const content = readFileSync(matchingFile, "utf8");
      const foundKeywords = keywords.filter(kw => content.includes(kw));
      console.log(`  Recognized keywords: ${foundKeywords.join(", ") || "(none)"}`);
      
      // Let's find some imports/requires or package names in the first 2000 chars
      const snippet = content.substring(0, 1000);
      console.log(`  Snippet: ${snippet.substring(0, 200)}...`);
    } catch (e) {
      console.log(`  Error reading file: ${e.message}`);
    }
  } else {
    console.log(`\nChunk: ${chunk} -> No direct filename match found.`);
  }
}
