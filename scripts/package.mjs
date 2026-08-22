import { access, copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const pluginDirectory = path.resolve(scriptDirectory, "..");
const distDirectory = path.join(pluginDirectory, "dist");
const packageDirectory = path.join(distDirectory, "create-nested-note");
const packageFiles = ["manifest.json", "styles.css"];
const compiledPlugin = path.join(packageDirectory, "main.js");

if (path.dirname(packageDirectory) !== distDirectory) {
  throw new Error("Refusing to package outside the plugin dist directory.");
}

await mkdir(packageDirectory, { recursive: true });
await access(compiledPlugin);

for (const fileName of packageFiles) {
  await copyFile(
    path.join(pluginDirectory, fileName),
    path.join(packageDirectory, fileName),
  );
}

console.log(`Packaged the plugin in ${packageDirectory}`);
