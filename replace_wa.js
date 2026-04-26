const fs = require("fs");
const path = require("path");

function processFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;
  for (const [regex, replacement] of replacements) {
    if (regex.test(content)) {
      content = content.replace(regex, replacement);
      changed = true;
    }
  }
  if (changed) fs.writeFileSync(filePath, content, "utf8");
}

const reps = [
  [
    /https:\/\/wa\.me\/50373317181\?text=[a-zA-Z0-9%_,]+/g,
    "https://confeccionesliss.axkar.com/",
  ],
  [
    /https:\/\/wa\.me\/50373317181\?text=\$\{s\.waText\}/g,
    "https://confeccionesliss.axkar.com/",
  ],
  [/https:\/\/wa\.me\/50373317181/g, "https://confeccionesliss.axkar.com/"],
  [/https:\/\/wa\.me\/50370000000/g, "https://confeccionesliss.axkar.com/"],
];

const files = [
  "src/components/seo/UniversidadesCoverage.tsx",
  "src/config/site.ts",
  "src/components/seo/ServiciosPrincipales.tsx",
  "src/components/seo/NapContacto.tsx",
  "src/components/layout/WhatsAppButton.tsx",
  "src/components/layout/Footer.tsx",
];

for (const file of files) {
  processFile(path.join(__dirname, file), reps);
}
