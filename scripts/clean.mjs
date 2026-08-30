import { rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const pluginDirectory = path.resolve(scriptDirectory, "..");
const distDirectory = path.join(pluginDirectory, "dist");

if (path.basename(distDirectory) !== "dist") {
  throw new Error("Refusing to clean outside the expected dist directory.");
}

await rm(distDirectory, { recursive: true, force: true });
