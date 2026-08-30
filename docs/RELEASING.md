# Releasing

This guide covers GitHub publishing and submission to the official Obsidian Community Plugins directory.

## Prepare the repository

The plugin must live in a dedicated public GitHub repository. Keep `manifest.json`, `README.md`, and `LICENSE` at the repository root. Do not commit `node_modules`, `dist`, or the generated `main.js` file.

Before the initial publication:

1. Review the plugin ID, name, author, description, and minimum Obsidian version in `manifest.json`.
2. Confirm that `package.json` and `manifest.json` use the same semantic version.
3. Run the complete verification:

   ```shell
   npm ci
   npm run lint
   npm run build
   ```

4. Test the packaged plugin on every supported platform.
5. Commit and push the source to the repository's default branch.

## Publish a GitHub release

1. Create a Git tag that exactly matches `manifest.json`, such as `1.0.0`. Do not prefix the tag with `v`.
2. Create a GitHub release from that tag.
3. Upload these files individually from `dist/`:

   ```text
   main.js
   manifest.json
   styles.css
   ```

4. Publish the release and confirm that all three assets are downloadable.

Obsidian uses the version in the repository's root `manifest.json` to locate a GitHub release with a matching tag.

## Submit to Obsidian Community Plugins

For the first release only:

1. Sign in at <https://community.obsidian.md> with an Obsidian account.
2. Link the GitHub account that owns the plugin repository.
3. Open **Plugins**, select **New plugin**, and enter the repository URL.
4. Review and accept Obsidian's developer policies and maintenance commitment.
5. Submit the plugin and address any automated review findings.

If review changes are required, increment the plugin version and publish a new matching GitHub release before resubmitting.

## Later releases

For every release:

1. Update the version in both `manifest.json` and `package.json`.
2. Run lint, build, and manual tests.
3. Commit the version change.
4. Tag the commit with the exact version number.
5. Publish the three release assets.

Add or update `versions.json` only when a release changes `minAppVersion`, so older Obsidian installations can select a compatible plugin version.
