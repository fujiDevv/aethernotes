# Contributing to Aether Notes

First off, thank you for taking the time to contribute! Contributions make the open-source community an amazing place to learn, inspire, and create.

Please read our guidelines below to ensure a smooth contribution process.

---

## ✦ Code of Conduct

By participating in this project, you agree to abide by the **Contributor Covenant Code of Conduct** (v2.1). Please report any unacceptable behavior to the project maintainers.

---

## ✦ Prerequisites

Before contributing, make sure you have the following installed:

| Tool | Version | Purpose |
|---|---|---|
| [Node.js](https://nodejs.org/) | v18+ | JavaScript runtime |
| [Bun](https://bun.sh/) | latest | Package manager and task runner |
| [Rust](https://rustup.rs/) | stable | Required for Tauri native builds |

> **Note**: Rust is only required if you're working on native desktop features or running `npx tauri dev`. For web-only development, Node.js and Bun are sufficient.

---

## ✦ Conventional Commits

We enforce Conventional Commits guidelines to keep our git history clean and automate changelog generation. Commits must follow this format:

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Allowed Types
- **feat**: A new feature (e.g., `feat(sidebar): add daily note shortcut button`)
- **fix**: A bug fix (e.g., `fix(editor): prevent cursor jumping on note load`)
- **docs**: Documentation updates (e.g., `docs: add testing strategy to readme`)
- **style**: Changes that do not affect the meaning of the code (formatting, white-space, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Build process or auxiliary tool/library changes

---

## ✦ Local Development Workflow

1. **Fork the Repository** and clone it locally.
2. **Create a Feature Branch**:
   - For new features: `feature/your-feature-name`
   - For bug fixes: `bugfix/issue-description`
3. **Install Dependencies**:
   ```bash
   bun install
   ```
4. **Develop and Test**:

   **Web-only development** (IndexedDB fallback, no Rust required):
   ```bash
   bun run dev
   ```

   **Native desktop development** (Tauri + filesystem storage):
   ```bash
   npx tauri dev
   ```

5. **Run Tests**:
   ```bash
   bun run test
   ```

6. **Run Verification Checks**:
   Before pushing, ensure your code compiles with no TypeScript warnings or bundler errors:
   ```bash
   bun run build
   ```

   For native builds:
   ```bash
   npx tauri build
   ```

---

## ✦ Architecture Overview

Aether Notes uses a **dual storage abstraction layer** (`src/lib/storage.ts`) that selects the backend at runtime:

| Environment | Storage Backend | Data Location |
|---|---|---|
| **Tauri desktop app** | `TauriFsStorageLayer` | Raw `.md` files in `~/Documents/Aether Notes` |
| **Web browser** | `IndexedDbStorageLayer` | IndexedDB via Dexie.js |

Both implementations conform to the `StorageLayer` interface. All data interactions must flow through Pinia stores, which delegate to the active storage layer.

---

## ✦ Coding Standards

*   **Vue 3 Composition API**: Use `<script setup lang="ts">` exclusively.
*   **Design Tokens & CSS Variables**: Do not write hardcoded color values. Map component colors to design tokens inside `src/assets/styles/tokens.css` to ensure full Light/Dark theme responsiveness.
*   **Storage Layer Abstraction**: All data interactions must flow through Pinia stores (`notes`, `folders`, `settings`) which delegate to the `StorageLayer` interface in `src/lib/storage.ts`. Do not import Dexie or Tauri FS APIs directly from components.
*   **Zero-Knowledge Encryption**: Ensure that notes are encrypted in the store layer before hitting the storage backend. Decrypted values should never be persisted to disk or IndexedDB.
*   **Tauri Capabilities**: If your feature requires new filesystem or OS permissions, update `src-tauri/capabilities/default.json` with the narrowest scope necessary.

---

## ✦ Key Files

When contributing, these are the files you'll most likely need to understand or modify:

| File | Purpose |
|---|---|
| `src/lib/storage.ts` | Storage abstraction — `StorageLayer` interface, Tauri FS and IndexedDB implementations |
| `src/stores/notes.ts` | Note CRUD, auto-save, encryption, concurrency control |
| `src/stores/folders.ts` | Folder hierarchy management |
| `src/stores/settings.ts` | User preferences persistence |
| `src/components/editor/NoteEditor.vue` | Main editor — Tiptap setup, outline, auto-save integration |
| `src-tauri/capabilities/default.json` | Tauri filesystem permission scopes |
| `src-tauri/tauri.conf.json` | Tauri app configuration (name, version, window settings) |

---

## ✦ Pull Request Checklist

Before submitting a Pull Request, please ensure the following checklist is completed:

- [ ] Branch is up-to-date with `main`.
- [ ] Commits follow Conventional Commits guidelines.
- [ ] Code builds without errors (`bun run build`).
- [ ] Unit tests pass (`bun run test`).
- [ ] Code styles match the project styling guide (design tokens, no hardcoded colors).
- [ ] New features work in **both** web (IndexedDB) and native (Tauri FS) modes.
- [ ] If adding new Tauri permissions, `src-tauri/capabilities/default.json` is updated.
- [ ] ARIA attributes and keyboard shortcuts have been tested for accessibility.
- [ ] You have filled out the Pull Request template.
