// build.js
const fse = require("fs-extra");
const path = require("path");

const srcDir = path.join(__dirname, "../src");
const distDir = path.join(__dirname, "../dist");

// Remove dist folder if it exists, then recreate it
fse.removeSync(distDir);
fse.ensureDirSync(distDir);

// Copy the entire src directory to dist
fse
  .copy(srcDir, distDir)
  .then(() => {
    console.log("Build complete. Files copied to dist/");
  })
  .catch((err) => {
    console.error("Build failed:", err);
  });
