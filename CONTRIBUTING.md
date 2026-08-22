# Contributing

Thank you for considering a contribution to Create Nested Note.

## Development setup

1. Install Node.js 20 or newer.
2. Fork and clone the repository.
3. Install the locked dependencies:

   ```shell
   npm ci
   ```

4. Build the plugin:

   ```shell
   npm run build
   ```

## Before submitting a pull request

Run all local checks:

```shell
npm run lint
npm run build
```

Test the plugin in Obsidian and confirm that it behaves correctly when invoked on both files and folders. Please also check duplicate names, invalid filenames, and cancellation of the name prompt.

Keep pull requests focused, describe the user-visible behavior, and include reproduction steps for bug fixes.

## Reporting issues

When reporting a bug, include:

- The Obsidian version and operating system
- Whether the issue occurs on desktop or mobile
- Steps to reproduce the problem
- The expected and actual behavior
- Relevant errors from Obsidian's developer console, if available
