import { rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const pluginDirectory = path.resolve(scriptDirectory, "..");
const distDirectory = path.join(pluginDirectory, "dist");
const packageDirectory = path.join(distDirectory, "create-nested-note");

if (
  path.dirname(packageDirectory) !== distDirectory ||
  path.basename(packageDirectory) !== "create-nested-note"
) {
  throw new Error("Refusing to clean outside the expected package directory.");
}

await rm(packageDirectory, { recursive: true, force: true });
