# Create Nested Note

Create a folder and a same-named Markdown note from Obsidian's file explorer context menu.

## Features

- Adds **Create nested note** to the file explorer context menu.
- Creates inside a selected folder or beside a selected file.
- Opens the newly created note automatically.
- Accepts names with or without the `.md` extension.
- Prevents invalid filenames and accidental path collisions.
- Works without accounts, network access, telemetry, or external services.
- Supports desktop and mobile versions of Obsidian.

## Usage

1. Right-click a file or folder in Obsidian's file explorer. On mobile, long-press the item.
2. Select **Create nested note**.
3. Enter a name and select **Create**.

For example, entering `about-this-site` creates:

```text
about-this-site/
└── about-this-site.md
```

When invoked on a folder, the new folder is created inside it. When invoked on a file, the new folder is created in that file's parent folder.

## Requirements

- Obsidian 1.4.0 or newer
- Desktop or mobile

## Installation

### Community plugins

Once the plugin is available in Obsidian's Community Plugins directory:

1. Open **Settings → Community plugins**.
2. Select **Browse** and search for **Create Nested Note**.
3. Select **Install**, then **Enable**.

### Manual installation

1. Download `main.js`, `manifest.json`, and `styles.css` from the latest GitHub release.
2. Create this directory inside your vault:

   ```text
   .obsidian/plugins/create-nested-note/
   ```

3. Copy the three downloaded files into that directory.
4. Reload Obsidian.
5. Enable **Create Nested Note** under **Settings → Community plugins**.

## Development

Node.js 20 or newer and npm are required.

```shell
npm ci
npm run lint
npm run build
```

Available scripts:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Watch `main.ts` and rebuild the development bundle. |
| `npm run lint` | Run ESLint with Obsidian's recommended rules. |
| `npm run build` | Type-check, minify, and stage the production package. |
| `npm run package` | Alias for the complete production build. |
| `npm run deploy -- "<plugin-directory>"` | Copy an existing package into a local vault. |

Production files are staged in `dist/create-nested-note/`.

The included VS Code tasks provide **Build production package** and **Deploy to working vault** commands. The deploy task builds first and then updates the working vault installation.

## Testing

This project is tested with BrowserStack.

## Project structure

```text
.
├── .github/workflows/ci.yml
├── .vscode/tasks.json
├── docs/RELEASING.md
├── scripts/
├── main.ts
├── manifest.json
├── styles.css
└── package.json
```

## Privacy and security

The plugin operates entirely within the active Obsidian vault. It does not make network requests, collect telemetry, display advertisements, require an account, or access files outside the vault.

## Contributing

Bug reports and focused pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for development and validation expectations.

## Releasing

Maintainer instructions for GitHub releases and Obsidian Community Plugins submission are in [docs/RELEASING.md](docs/RELEASING.md).

## License

Licensed under the [MIT License](LICENSE).
