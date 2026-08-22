import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const targetArgument = process.argv.slice(2).join(" ").trim();
if (!targetArgument) {
  throw new Error("Pass the installed plugin directory as the deploy target.");
}

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const pluginDirectory = path.resolve(scriptDirectory, "..");
const packageDirectory = path.join(
  pluginDirectory,
  "dist",
  "create-nested-note",
);
const targetDirectory = path.resolve(targetArgument);
const targetParent = path.dirname(targetDirectory);

if (
  path.basename(targetDirectory) !== "create-nested-note" ||
  path.basename(targetParent) !== "plugins" ||
  path.basename(path.dirname(targetParent)) !== ".obsidian"
) {
  throw new Error(
    "The deploy target must be .obsidian/plugins/create-nested-note.",
  );
}

await mkdir(targetDirectory, { recursive: true });

for (const fileName of ["main.js", "manifest.json", "styles.css"]) {
  await copyFile(
    path.join(packageDirectory, fileName),
    path.join(targetDirectory, fileName),
  );
}

console.log(`Deployed the plugin to ${targetDirectory}`);
