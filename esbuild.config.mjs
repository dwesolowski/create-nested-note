import esbuild from "esbuild";
import { builtinModules } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const production = process.argv[2] === "production";
const pluginDirectory = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.join(
  pluginDirectory,
  "dist",
  "create-nested-note",
);

const context = await esbuild.context({
  absWorkingDir: pluginDirectory,
  entryPoints: [path.join(pluginDirectory, "main.ts")],
  bundle: true,
  external: [
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/highlight",
    "@lezer/lr",
    ...builtinModules,
  ],
  format: "cjs",
  target: "es2018",
  logLevel: "info",
  minify: production,
  sourcemap: production ? false : "inline",
  treeShaking: true,
  outfile: path.join(outputDirectory, "main.js"),
});

if (production) {
  await context.rebuild();
  await context.dispose();
} else {
  await context.watch();
}
