# Aether Notes

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4fc08d.svg)](https://vuejs.org/)
[![Tauri](https://img.shields.io/badge/Tauri-v2-ffc131.svg)](https://v2.tauri.app/)
[![Tiptap](https://img.shields.io/badge/Editor-Tiptap-black.svg)](https://tiptap.dev/)

A minimal, secure, local-first note-taking application. Notes are stored as raw Markdown files on your filesystem — no cloud, no accounts, no lock-in. Built with **Vue 3**, **Tauri v2**, **Tiptap**, and **Pinia**.

> Available as a **native desktop app** (macOS, Windows, Linux) and as a **web demo** with IndexedDB fallback.

---

## Download

| Platform              | Link                                                                    |
| -----------------------| -------------------------------------------------------------------------|
| macOS (Apple Silicon) | [Download .dmg](https://github.com/fujiDevv/aethernotes/releases/)      |
| macOS (Intel)         | [Download .dmg](https://github.com/fujiDevv/aethernotes/releases/)      |
| Windows               | [Download .msi](https://github.com/fujiDevv/aethernotes/releases/)      |
| Linux                 | [Download .AppImage](https://github.com/fujiDevv/aethernotes/releases/) |

Or try the [web demo](https://aethernotes.vercel.app) — runs entirely in-browser with IndexedDB storage.

---

## Documentation

| Document | Description |
|---|---|
| [docs/architecture.md](docs/architecture.md) | System design, storage abstraction, cryptosystem workflow, and accessibility |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Development setup, commit conventions, PR templates, and coding standards |

---

## Features

### Native Filesystem Storage

- **Raw Markdown Files** — Notes are saved as `.md` files in `~/Documents/Aether Notes`. Edit them with any text editor.
- **YAML Frontmatter** — Metadata (ID, tags, pins, timestamps) is serialized in each file's frontmatter header.
- **Physical Folders** — UI folders map directly to subdirectories on disk.
- **Web Fallback** — When running in-browser, all data persists in IndexedDB via Dexie.js. No server required.

### Markdown-First Editor

- **Title Autogeneration** — Note titles derive from the first H1 heading.
- **Slash Commands** — Type `/` to trigger the formatting menu (Paragraph, H1, H2, H3).
- **Bubble Menu** — Context-aware floating toolbar for bold, italic, strikethrough, highlight, inline code, and links.
- **Live Outline** — Collapsible Table of Contents that indexes H1–H3 headings with smooth scroll-to navigation.
- **Inline Tag Highlighting** — `@tags` are parsed and highlighted inline. Sidebar tag click scrolls to first occurrence.

### Encryption and Security

- **AES-256-GCM** — Client-side encryption via the native Web Crypto API. Key derivation uses PBKDF2 (100,000 iterations).
- **Zero-Knowledge** — The decryption key lives only in memory and is never written to disk.
- **Passphrase Rotation** — Re-encrypts all notes in a single batch transaction when the passphrase changes.
- **No Network Requests** — All data stays on your machine. No servers, no telemetry, no accounts.

### Search and Organization

- **Command Palette** — Fuzzy search powered by Fuse.js over note titles, bodies, and tags. Instant commands: create note, toggle theme, delete note.
- **Nested Folders** — Drag-and-drop hierarchy with custom label accent colors.
- **Trash and Purge** — Soft-deleted notes are held for a configurable window before permanent removal.

### Accessibility

- **Focus Trapping** — Keyboard focus is contained within active dialogs and restored on close.
- **ARIA Tree** — Sidebar folder tree uses `role="tree"` / `role="treeitem"` with `aria-expanded`.
- **Keyboard Shortcuts** — `Cmd/Ctrl+K` for Command Palette, `Escape` to dismiss, arrow keys for navigation.

### Typography and Customization

- **Font Families** — System Sans-Serif, Editorial Serif, or Monospace.
- **Font Size** — Adjustable from 14px to 24px.
- **Editor Options** — Line wrapping, line numbers, and native spellcheck toggles.

---

## Project Structure

```text
aether-notes/
├── .github/
│   └── workflows/
│       └── release.yml          # Cross-platform CI/CD (macOS, Windows, Linux)
├── docs/
│   └── architecture.md          # System design and architectural decisions
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── tokens.css       # Light/dark color tokens
│   │       ├── global.css       # Resets, scrollbars, noise overlay
│   │       ├── editor.css       # Tiptap styling overrides
│   │       └── transitions.css  # Vue transition timing
│   ├── components/
│   │   ├── editor/              # Tiptap wrapper, BubbleMenu, Toolbar
│   │   ├── layout/              # AppShell, TopBar, StatusBar
│   │   ├── note-list/           # Note items, filtering, context menus
│   │   ├── search/              # Command Palette
│   │   ├── settings/            # Preferences panel and encryption
│   │   └── sidebar/             # Folder tree, tag list, footer
│   ├── composables/             # useAutoSave, useTheme, useKeyboard
│   ├── extensions/              # Custom Tiptap/ProseMirror extensions
│   ├── lib/
│   │   ├── crypto.ts            # AES-256-GCM encryption helpers
│   │   ├── db.ts                # Dexie.js database (web fallback)
│   │   └── storage.ts           # Storage abstraction (Tauri FS ↔ IndexedDB)
│   ├── stores/                  # Pinia stores: notes, folders, settings, ui
│   ├── types/                   # TypeScript interfaces
│   ├── views/                   # LandingPage, DocsPage
│   ├── App.vue
│   └── main.ts
├── src-tauri/
│   ├── capabilities/
│   │   └── default.json         # Filesystem permission scopes
│   ├── icons/                   # App icons (all platforms)
│   ├── src/
│   │   └── lib.rs               # Tauri backend entry point
│   ├── Cargo.toml
│   └── tauri.conf.json          # Tauri app configuration
├── index.html
├── vite.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **[Bun](https://bun.sh/)** (recommended) or npm
- **Rust** (for native builds) — install via [rustup.rs](https://rustup.rs)

### Install

```bash
git clone https://github.com/joshuasarmiento/aethernotes.git
cd aethernotes
bun install
```

### Development

#### Web only (no native features)
```bash
bun run dev
```

#### Native desktop app (Tauri)
```bash
npx tauri dev
```

### Production Build

#### Web
```bash
bun run build
```

#### Native desktop (generates .app/.dmg/.msi/.AppImage)
```bash
npx tauri build
```

---

## Testing

| Layer | Tool | Scope |
|---|---|---|
| Unit | Vitest | `crypto.ts` key derivation, store integration |
| Component | Vitest + Vue Test Utils | Pinia state sync, Tiptap extensions |

```bash
bun run test
```

---

## Architecture: Storage Abstraction

Aether Notes uses a **dual storage layer** that selects the backend at runtime:

```
┌─────────────────────────────┐
│         Pinia Stores        │
│   (notes, folders, settings)│
└──────────┬──────────────────┘
           │
    ┌──────▼──────┐
    │ StorageLayer │  ← interface
    └──┬───────┬──┘
       │       │
  ┌────▼───┐ ┌─▼──────────┐
  │ Tauri  │ │  IndexedDB  │
  │   FS   │ │  (Dexie.js) │
  └────────┘ └─────────────┘
   .md files    Browser-only
   on disk       fallback
```

- **Tauri FS**: Notes saved as `.md` files with YAML frontmatter in `~/Documents/Aether Notes`
- **IndexedDB**: Automatic fallback when running in-browser (web demo)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide — development setup, commit conventions, branch naming, PR checklist, and coding standards.

---

## License

[MIT](LICENSE) — Copyright (c) 2026 Joshua Sarmiento.
