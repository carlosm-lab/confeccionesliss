const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Ensure sharp is installed locally for this script
try {
  require.resolve("sharp");
} catch (e) {
  console.log("Installing sharp...");
  execSync("npm install --no-save sharp", { stdio: "inherit" });
}

const sharp = require("sharp");

const srcDir = "C:\\Users\\usuar\\Desktop\\Uniformes";
const destDir = path.join(__dirname, "public", "images", "uniformes");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function convertImages() {
  const folders = fs
    .readdirSync(srcDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const folder of folders) {
    const folderPath = path.join(srcDir, folder);
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      if (file.match(/\.(png|jpe?g)$/i)) {
        const inputPath = path.join(folderPath, file);
        // Clean folder name for file: ieproes, ues, etc.
        let outName = folder.toLowerCase();
        if (outName === "sublimación") outName = "sublimacion";

        const outputPath = path.join(destDir, `${outName}.webp`);

        console.log(`Converting ${inputPath} to ${outputPath}`);
        await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
      }
    }
  }
  console.log("Conversion complete!");
}

convertImages().catch(console.error);
