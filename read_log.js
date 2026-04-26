const fs = require("fs");
const lines = fs
  .readFileSync(
    "C:/Users/usuar/.gemini/antigravity/brain/e9695f3d-4e25-4211-9a4f-3a4fa9d070a5/.system_generated/logs/overview.txt",
    "utf-8"
  )
  .split("\n");
const lastUser = lines
  .filter((l) => l.includes('"source":"USER_EXPLICIT"'))
  .pop();
console.log(JSON.parse(lastUser).content);
