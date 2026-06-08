<template>
  <div class="docs-page">

    <!-- Top Bar -->
    <header class="docs-header font-ui">
      <div class="docs-header-inner">
        <div class="docs-logo-container">
          <!-- Sidebar Toggle Button (visible only on mobile) -->
          <button class="sidebar-toggle" @click="toggleSidebar" :aria-expanded="sidebarOpen"
            aria-label="Toggle navigation">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>

          <router-link to="/" class="docs-logo">
            <svg class="logo-icon" width="14" height="20" viewBox="0 0 333 510" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M169.501 0.264499C172.368 1.7765 172.368 1.7765 175.376 3.9525C175.928 4.3495 176.479 4.7465 177.048 5.1555C184.435 10.5545 191.478 16.4055 198.501 22.2645C199.1 22.7635 199.699 23.2615 200.316 23.7755C207.52 29.7815 214.58 35.9325 221.501 42.2645C222.473 43.1435 223.445 44.0225 224.446 44.9285C230.736 50.6455 236.855 56.5165 242.876 62.5145C243.857 63.4885 243.857 63.4885 244.857 64.4815C249.274 68.9125 253.424 73.5215 257.501 78.2645C258.451 79.3475 259.401 80.4295 260.353 81.5105C268.153 90.4535 275.435 99.7325 282.501 109.264C283.267 110.29 283.267 110.29 284.048 111.338C303.4 137.42 317.147 166.227 326.501 197.264C326.901 198.537 326.901 198.538 327.31 199.837C331.76 214.815 333.003 230.045 332.892 245.598C332.876 248.263 332.892 250.927 332.911 253.592C332.931 268.923 331.561 284.231 326.376 298.764C326.076 299.628 325.776 300.493 325.467 301.383C319.813 317.191 312.186 331.57 302.501 345.264C302.082 345.86 301.662 346.456 301.23 347.07C289.864 362.949 275.363 376.926 259.501 388.264C258.945 388.67 258.389 389.077 257.815 389.495C243.751 399.681 227.9 408.134 211.708 414.397C209.493 415.217 209.493 415.217 207.478 416.35C203.897 418.006 200.336 418.035 196.501 417.264C192.918 414.266 191.727 412.32 190.751 407.764C191.587 403.862 192.792 402.125 195.958 399.71C199.706 397.58 203.704 396.269 207.759 394.854C246.528 380.894 278.606 349.579 298.501 314.264C299.055 313.305 299.61 312.346 300.181 311.358C315.676 282.776 316.739 246.493 310.501 215.264C310.356 214.527 310.212 213.792 310.063 213.033C306.91 197.399 301.785 181.481 294.501 167.264C294.342 168.45 294.184 169.636 294.021 170.858C291.881 186.032 288.798 200.133 280.501 213.264C279.989 214.08 279.477 214.897 278.95 215.738C270.259 228.826 258.403 240.112 246.501 250.264C244.209 252.221 241.917 254.18 239.626 256.139C239.02 256.657 238.414 257.176 237.789 257.71C233.378 261.49 229.036 265.339 224.739 269.249C222.629 271.15 220.478 272.99 218.313 274.827C202.638 288.516 190.998 308.149 184.876 327.889C184.577 328.842 184.278 329.795 183.969 330.776C181.496 338.859 179.712 346.898 178.501 355.264C178.328 356.376 178.156 357.489 177.978 358.635C177.234 364.682 177.357 370.753 177.359 376.837C177.356 378.198 177.353 379.559 177.349 380.919C177.341 383.836 177.336 386.752 177.332 389.669C177.326 394.283 177.31 398.898 177.291 403.512C177.285 405.096 177.278 406.679 177.272 408.263C177.269 409.055 177.266 409.848 177.262 410.664C177.22 421.397 177.187 432.131 177.175 442.865C177.167 450.12 177.144 457.374 177.106 464.629C177.086 468.464 177.074 472.299 177.079 476.133C177.083 479.736 177.069 483.339 177.042 486.943C177.031 488.891 177.041 490.837 177.051 492.785C176.936 503.535 176.936 503.535 172.501 508.264C169.316 509.857 165.968 509.655 162.501 509.264C159.265 507.521 158.677 506.792 157.501 503.264C157.405 501.487 157.368 499.706 157.363 497.926C157.358 496.818 157.352 495.71 157.346 494.568C157.345 493.351 157.344 492.134 157.343 490.88C157.335 488.912 157.328 486.945 157.32 484.977C157.312 482.857 157.307 480.737 157.302 478.618C157.291 474.18 157.271 469.743 157.249 465.305C157.187 452.683 157.133 440.059 157.1 427.438C157.081 420.469 157.052 413.5 157.012 406.531C156.991 402.854 156.975 399.177 156.973 395.5C156.956 374.874 156.594 354.156 150.501 334.264C150.307 333.605 150.112 332.946 149.912 332.267C145.582 317.722 139.504 304.561 130.501 292.264C130.001 291.56 129.501 290.857 128.985 290.132C119.766 277.88 108.1 266.767 96.0825 257.339C92.4925 254.455 89.1425 251.337 85.7685 248.205C83.0565 245.689 80.3175 243.224 77.5005 240.826C58.5075 224.203 42.8205 203.067 40.2945 177.15C40.1135 173.505 40.2065 169.899 40.5005 166.264C39.8405 166.264 39.1805 166.264 38.5005 166.264C38.1295 167.44 37.7575 168.615 37.3755 169.826C36.0035 173.98 34.3785 177.98 32.6885 182.014C19.6855 213.939 16.9285 248.455 23.5005 282.264C23.7055 283.371 23.9105 284.48 24.1215 285.62C29.8615 312.039 46.3305 335.094 65.1175 353.882C66.4945 355.259 67.8565 356.651 69.1765 358.081C85.0605 375.028 108.1 389.006 130.148 396.15C134.945 397.772 137.998 399.681 141.501 403.264C142.534 406.703 142.278 409.773 141.501 413.264C139.439 415.889 139.439 415.889 136.501 417.264C112.542 418.969 81.7195 395.128 64.5005 380.264C63.7435 379.617 62.9875 378.97 62.2075 378.303C45.9995 364.078 32.2655 349.05 21.5005 330.264C21.1355 329.641 20.7705 329.017 20.3955 328.375C11.5945 313.222 5.52752 296.551 2.50052 279.264C2.29652 278.105 2.09352 276.947 1.88352 275.753C-7.02148 214.457 16.6115 155.859 52.4775 107.28C56.3245 102.135 60.3335 97.1535 64.5005 92.2645C65.4445 91.1465 66.3885 90.0275 67.3325 88.9095C77.4735 76.9375 88.1135 65.5595 99.1885 54.4525C99.9345 53.7015 99.9345 53.7015 100.696 52.9365C106.452 47.1575 112.303 41.5685 118.501 36.2645C120.046 34.8515 121.588 33.4355 123.126 32.0145C128.805 26.8855 134.817 22.2265 140.863 17.5425C143.161 15.7495 145.424 13.9135 147.689 12.0765C149.29 10.8025 150.894 9.5315 152.501 8.2645C153.441 7.5155 154.38 6.7665 155.349 5.9945C156.306 5.2585 157.264 4.5225 158.251 3.7645C159.112 3.0945 159.973 2.4235 160.86 1.7335C164.113 -0.0765007 165.826 -0.278501 169.501 0.264499Z"
                fill="currentColor" />
            </svg>
            <span class="docs-logo-text">Aether Notes</span>
            <span class="docs-logo-badge">Docs</span>
          </router-link>
        </div>

        <div class="docs-header-right">
          <button class="theme-toggle" @click="cycleTheme" :aria-label="`Switch theme (${settingsStore.theme})`">
            <svg v-if="settingsStore.theme === 'system'" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <rect width="20" height="14" x="2" y="3" rx="2" />
              <line x1="8" x2="16" y1="21" y2="21" />
              <line x1="12" x2="12" y1="17" y2="21" />
            </svg>
            <svg v-else-if="settingsStore.theme === 'dark'" xmlns="http://www.w3.org/2000/svg" width="14" height="14"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path
                d="M12 2v2M12 20v2m-7.07-14.07 1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2m-15.07 5.66-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          </button>
          <router-link to="/note" class="launch-btn">Launch App</router-link>
        </div>
      </div>
    </header>

    <!-- Layout -->
    <div class="docs-layout">

      <!-- Sidebar Nav -->
      <aside class="docs-sidebar font-ui" :class="{ 'is-open': sidebarOpen }">
        <nav>
          <div v-for="section in navSections" :key="section.label" class="nav-group">
            <span class="nav-group-label">{{ section.label }}</span>
            <a v-for="item in section.items" :key="item.id" :href="`#${item.id}`" class="nav-link"
              :class="{ active: activeSection === item.id }" @click.prevent="scrollTo(item.id)">{{ item.title }}</a>
          </div>
        </nav>
      </aside>

      <!-- Sidebar Backdrop -->
      <div v-if="sidebarOpen" class="sidebar-backdrop" @click="sidebarOpen = false"></div>

      <!-- Main Content -->
      <main class="docs-content">

        <!-- Introduction -->
        <section id="introduction" class="doc-section">
          <h1 class="doc-h1 font-display">Aether Notes Documentation</h1>
          <p class="doc-p">Welcome to Aether Notes — a privacy-first, local-first, native markdown editor built for speed, security, and complete data ownership. Your notes are saved locally on your computer as plain text files, putting you in full control of your digital workspace.</p>
          
          <div class="doc-callout info">
            <strong>Privacy &amp; Ownership:</strong> Aether Notes does not store your notes in the cloud, require any online account, or track your activity. Your data is stored entirely on your own device.
          </div>
        </section>

        <hr class="doc-divider" />

        <!-- Installation -->
        <section id="installation" class="doc-section">
          <h2 class="doc-h2 font-display">Installation &amp; Launch</h2>
          <p class="doc-p">Aether Notes is available as a native desktop application across major operating systems. Download the latest installer from the official release repository.</p>
          
          <h3 class="doc-h3">macOS (Apple Silicon &amp; Intel)</h3>
          <div class="doc-steps">
            <div class="step">
              <div class="step-num">1</div>
              <div>
                <strong>Download the Disk Image (.dmg)</strong>
                <p>Choose the version matching your processor: Apple Silicon (M1/M2/M3) or Intel.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div>
                <strong>Install the App</strong>
                <p>Double-click the downloaded `.dmg` file and drag <strong>Aether Notes</strong> into your Applications folder.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div>
                <strong>Launch</strong>
                <p>Open the app from Applications. On first launch, macOS might require you to allow the app through System Settings > Privacy &amp; Security.</p>
              </div>
            </div>
          </div>

          <h3 class="doc-h3">Windows</h3>
          <div class="doc-steps">
            <div class="step">
              <div class="step-num">1</div>
              <div>
                <strong>Download the MSI Installer</strong>
                <p>Retrieve the `.msi` setup file for Windows (x64).</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div>
                <strong>Run Installation</strong>
                <p>Double-click the installer and follow the setup wizard prompts to install the application.</p>
              </div>
            </div>
          </div>

          <h3 class="doc-h3">Linux</h3>
          <div class="doc-steps">
            <div class="step">
              <div class="step-num">1</div>
              <div>
                <strong>Download the AppImage</strong>
                <p>Fetch the portable `.AppImage` binary.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div>
                <strong>Make it Executable</strong>
                <p>Right-click the `.AppImage` file, open Properties, and enable the executable permission (or run <code class="inline-code">chmod +x Aether-Notes.AppImage</code> in terminal).</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div>
                <strong>Run the App</strong>
                <p>Double-click the file to launch the application instantly.</p>
              </div>
            </div>
          </div>
        </section>

        <hr class="doc-divider" />

        <!-- Storage Location -->
        <section id="storage-location" class="doc-section">
          <h2 class="doc-h2 font-display">Where Notes Are Saved</h2>
          <p class="doc-p">Unlike cloud-based note editors, Aether Notes writes your notes directly to your local drive. This ensures that you can access, edit, and back up your notes even if you stop using the application.</p>
          
          <h3 class="doc-h3">Notes Directory</h3>
          <p class="doc-p">On desktop, your notes folder is created inside your system's Documents folder:</p>
          <div class="doc-code-block">
            <div class="code-header">
              <span>Path</span>
            </div>
            <pre class="code-body"><code>~/Documents/Aether Notes/</code></pre>
          </div>

          <h3 class="doc-h3">Note Portability &amp; Syncing</h3>
          <ul class="doc-list">
            <li><strong>Raw Markdown:</strong> Every note is a plain-text <code class="inline-code">.md</code> file. You can open and edit them using any markdown editor (like Obsidian, VS Code, or TextEdit).</li>
            <li><strong>Folder Hierarchy:</strong> Folders and subfolders in the application directly correspond to folders on your computer's filesystem.</li>
            <li><strong>Backup &amp; Sync:</strong> Since notes are standard files on disk, you can back them up or sync them across devices using tools like iCloud, OneDrive, Dropbox, or Git.</li>
          </ul>
        </section>

        <hr class="doc-divider" />

        <!-- Markdown Editor -->
        <section id="rich-editor" class="doc-section">
          <h2 class="doc-h2 font-display">Features: Markdown Editor</h2>
          <p class="doc-p">Aether Notes provides a distraction-free, rich markdown editor with immediate live rendering and flexible formatting tools.</p>
          
          <h3 class="doc-h3">Slash Commands</h3>
          <p class="doc-p">Type <kbd>/</kbd> on a new line to access a quick-action block insertion menu. From here, you can quickly insert:</p>
          <ul class="doc-list">
            <li>Headings (H1, H2, H3)</li>
            <li>Bullet and numbered lists</li>
            <li>Task lists/checkboxes</li>
            <li>Code blocks and quotes</li>
          </ul>

          <h3 class="doc-h3">Formatting Bubble Menu</h3>
          <p class="doc-p">Simply select any text within the editor to summon the formatting bubble menu. It allows you to quickly apply bold, italic, strikethrough, inline code, or link formatting directly to the selection.</p>

          <h3 class="doc-h3">Live Document Outline</h3>
          <p class="doc-p">A collapsible table of contents (outline) is displayed alongside the note. Click on any heading in the outline to instantly jump to that section of your document.</p>

          <h3 class="doc-h3">Inline Hashtags</h3>
          <p class="doc-p">Organize your notes dynamically by adding tags. Type a hashtag (e.g. <code class="inline-code">#ideas</code>) inside your note body, or add tags in the tag bar at the bottom of the editor window. Tags are indexed for fast searching.</p>
        </section>

        <hr class="doc-divider" />

        <!-- Vault & Encryption -->
        <section id="vault-security" class="doc-section">
          <h2 class="doc-h2 font-display">Features: Vault &amp; Encryption</h2>
          <p class="doc-p">Protect sensitive thoughts, passwords, and journals with professional, military-grade client-side encryption.</p>

          <h3 class="doc-h3">AES-256-GCM Zero-Knowledge Model</h3>
          <p class="doc-p">When you set up an encryption vault, the application uses the AES-256-GCM algorithm via the Web Crypto API to secure individual notes. Your master passphrase is run through a key derivation function (PBKDF2) to unlock notes temporarily in memory.</p>

          <div class="doc-callout warning">
            <strong>CRITICAL WARNING:</strong> Since your master passphrase is never stored on disk, sent online, or saved anywhere, there is <strong>no password recovery option</strong>. If you forget your passphrase, all notes inside your vault will remain locked permanently.
          </div>
          
          <h3 class="doc-h3">Decrypted in Memory</h3>
          <p class="doc-p">Encrypted notes are saved to disk with their title and metadata visible (stored in the note header frontmatter), but the entire body is replaced with ciphertext. Unlocking a note decrypts it only inside memory; it is never saved in raw plaintext format back to your disk while encrypted.</p>
        </section>

        <hr class="doc-divider" />

        <!-- Folders & Tags -->
        <section id="file-org" class="doc-section">
          <h2 class="doc-h2 font-display">Features: Folders &amp; Tags</h2>
          <p class="doc-p">Keep your thoughts organized with custom structures, favorites, and dynamic tag indexing.</p>

          <h3 class="doc-h3">Hierarchical Folders</h3>
          <p class="doc-p">Create nested folders to organize your notes. Drag and drop folders or notes in the sidebar to reorder them. Any changes you make in the UI are automatically reflected in the filesystem folder structure.</p>

          <h3 class="doc-h3">Favorites &amp; Pinned Notes</h3>
          <ul class="doc-list">
            <li><strong>Pins:</strong> Pin critical notes to the top of note lists for immediate access.</li>
            <li><strong>Favorites:</strong> Add notes to your Favorites group to access them from the sidebar shortcuts index.</li>
          </ul>

          <h3 class="doc-h3">Trash Bin</h3>
          <p class="doc-p">Deleting a note moves it to the Trash bin. Notes in the trash are excluded from search results and can be restored at any time. Empty the trash to permanently delete notes from your disk.</p>
        </section>

        <hr class="doc-divider" />

        <!-- Command Palette -->
        <section id="command-palette" class="doc-section">
          <h2 class="doc-h2 font-display">Features: Command Palette</h2>
          <p class="doc-p">Navigate your notes, folders, and settings entirely using your keyboard via a powerful fuzzy search console.</p>

          <h3 class="doc-h3">Quick Access Console</h3>
          <p class="doc-p">Press <kbd>Cmd+K</kbd> (macOS) or <kbd>Ctrl+K</kbd> (Windows/Linux) from anywhere in the application to activate the Command Palette.</p>
          <ul class="doc-list">
            <li><strong>Fuzzy Search:</strong> Search through note titles, content, and folder names instantly.</li>
            <li><strong>Quick Navigation:</strong> Press up/down arrows to browse results, and <kbd>Enter</kbd> to jump straight to the selected note or folder.</li>
          </ul>
        </section>

        <hr class="doc-divider" />

        <!-- Creating Notes -->
        <section id="create-notes" class="doc-section">
          <h2 class="doc-h2 font-display">How to Use: Managing Notes</h2>
          <p class="doc-p">A guide to basic note operations, formatting, and editor tools.</p>

          <h3 class="doc-h3">Creating a Note</h3>
          <div class="doc-steps">
            <div class="step">
              <div class="step-num">1</div>
              <div>
                <strong>Click New Note</strong>
                <p>Click the <strong>"+"</strong> button at the top of the note list panel, or use the global shortcut <kbd>Cmd+N</kbd> / <kbd>Ctrl+N</kbd>.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div>
                <strong>Enter Title</strong>
                <p>Provide a title in the header field. The physical file will be named accordingly (e.g., "Untitled Note.md").</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div>
                <strong>Write Content</strong>
                <p>Start writing. Use standard markdown or slash commands to style your text. Auto-save triggers automatically as you type.</p>
              </div>
            </div>
          </div>
        </section>

        <hr class="doc-divider" />

        <!-- Organizing Notes -->
        <section id="organize-notes" class="doc-section">
          <h2 class="doc-h2 font-display">How to Use: Organizing Notes</h2>
          <p class="doc-p">Maintain structure using folders, tags, favorites, and pins.</p>

          <h3 class="doc-h3">Setting Up Folders</h3>
          <ul class="doc-list">
            <li><strong>New Folder:</strong> Click the new folder icon on the sidebar, type a name, and press <kbd>Enter</kbd>.</li>
            <li><strong>Nesting Folders:</strong> Drag a folder in the sidebar and drop it on top of another folder to make it a subfolder.</li>
            <li><strong>Moving Notes:</strong> Drag a note from the note list panel and drop it into a folder in the sidebar.</li>
          </ul>

          <h3 class="doc-h3">Using Tags</h3>
          <p class="doc-p">To tag a note, add a tag at the bottom of the editor screen by clicking <strong>Add Tag</strong>, or write hashtags directly in your document body. You can view and filter notes by tags in the sidebar panel.</p>
        </section>

        <hr class="doc-divider" />

        <!-- Encrypting Notes -->
        <section id="encrypt-notes" class="doc-section">
          <h2 class="doc-h2 font-display">How to Use: Encrypting Notes</h2>
          <p class="doc-p">Secure sensitive notes in a local cryptographic vault.</p>

          <h3 class="doc-h3">Initializing the Vault</h3>
          <div class="doc-steps">
            <div class="step">
              <div class="step-num">1</div>
              <div>
                <strong>Open Vault Settings</strong>
                <p>Go to settings, and click on the **Encryption** tab.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div>
                <strong>Set Master Passphrase</strong>
                <p>Choose a strong, memorable passphrase. Write it down safely elsewhere.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div>
                <strong>Confirm setup</strong>
                <p>Your vault is now active. Locked notes will use this passphrase to decrypt.</p>
              </div>
            </div>
          </div>

          <h3 class="doc-h3">Encrypting an Existing Note</h3>
          <p class="doc-p">Open the note you want to secure, click the shield/lock icon in the editor toolbar, and select **Encrypt Note**. The note will instantly be encrypted on your local drive.</p>
        </section>

        <hr class="doc-divider" />

        <!-- Keyboard Shortcuts -->
        <section id="keyboard-shortcuts" class="doc-section">
          <h2 class="doc-h2 font-display">Keyboard Shortcuts Reference</h2>
          <p class="doc-p">Use these global keyboard shortcuts to speed up your note-taking workflow:</p>
          
          <table class="doc-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>macOS Shortcut</th>
                <th>Windows/Linux Shortcut</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Create New Note</strong></td>
                <td><kbd>Cmd + N</kbd></td>
                <td><kbd>Ctrl + N</kbd></td>
              </tr>
              <tr>
                <td><strong>Toggle Sidebar</strong></td>
                <td><kbd>Cmd + \</kbd></td>
                <td><kbd>Ctrl + \</kbd></td>
              </tr>
              <tr>
                <td><strong>Command Palette</strong></td>
                <td><kbd>Cmd + K</kbd></td>
                <td><kbd>Ctrl + K</kbd></td>
              </tr>
              <tr>
                <td><strong>Toggle Dark/Light Theme</strong></td>
                <td><kbd>Cmd + Shift + L</kbd></td>
                <td><kbd>Ctrl + Shift + L</kbd></td>
              </tr>
              <tr>
                <td><strong>Toggle Focus Mode</strong></td>
                <td><kbd>Cmd + Shift + F</kbd></td>
                <td><kbd>Ctrl + Shift + F</kbd></td>
              </tr>
              <tr>
                <td><strong>Close Search / Palette</strong></td>
                <td><kbd>Esc</kbd></td>
                <td><kbd>Esc</kbd></td>
              </tr>
            </tbody>
          </table>
        </section>

        <div class="doc-callout info">
          <strong>Developer &amp; Systems Reference:</strong> The sections below outline the core system architecture, development configurations, and deployment build pipelines. If you are not a developer contributing to Aether Notes, you can safely skip this part.
        </div>

        <hr class="doc-divider" />

        <!-- Architecture -->
        <section id="architecture" class="doc-section">
          <h1 class="doc-h1 font-display">Architecture &amp; System Design</h1>
          <p class="doc-p">Aether Notes is a native desktop application built with Tauri v2 and Vue 3. Notes are stored as raw Markdown files on the host filesystem — no cloud, no accounts, no vendor lock-in.</p>
          
          <h3 class="doc-h3">1.1 Why Tauri v2</h3>
          <table class="doc-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Tauri v2</th>
                <th>Electron</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Bundle Size</strong></td>
                <td><strong>~5–15 MB</strong><br>Uses native OS webview (WebView2, WebKitGTK, WKWebView).</td>
                <td><strong>~80 MB+</strong><br>Bundles full Chromium + Node.js runtime.</td>
              </tr>
              <tr>
                <td><strong>Memory Usage</strong></td>
                <td><strong>Sandboxed Rust backend</strong>;<br>low idle footprint.</td>
                <td>Multi-process Chromium architecture; higher baseline.</td>
              </tr>
              <tr>
                <td><strong>Security Model</strong></td>
                <td><strong>Capability-based permissions</strong>;<br>system calls gated via IPC boundary.</td>
                <td>Direct Node.js API access from renderer by default.</td>
              </tr>
            </tbody>
          </table>

          <h3 class="doc-h3">1.2 Dual Storage Layer</h3>
          <p class="doc-p">The application uses a <code class="inline-code">StorageLayer</code> interface that selects the appropriate backend at runtime. Both implementations are interchangeable and share the same API surface.</p>
          <table class="doc-table">
            <thead>
              <tr>
                <th>Environment</th>
                <th>Backend</th>
                <th>Data Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Tauri Desktop</strong></td>
                <td><code class="inline-code">TauriFsStorageLayer</code></td>
                <td><code class="inline-code">~/Documents/Aether Notes/</code></td>
              </tr>
              <tr>
                <td><strong>Web Browser</strong></td>
                <td><code class="inline-code">IndexedDbStorageLayer</code></td>
                <td>Browser IndexedDB (via Dexie.js)</td>
              </tr>
            </tbody>
          </table>

          <h3 class="doc-h3">1.3 Note File Format</h3>
          <p class="doc-p">In native mode, each note is a <code class="inline-code">.md</code> file with YAML frontmatter for metadata. This makes notes fully portable and editable in any text editor.</p>
          <div class="doc-code-block">
            <div class="code-header">
              <span>Example: My Note.md</span>
              <button class="copy-btn" @click="copyText(frontmatterSnippet)">{{ copied === frontmatterSnippet ? 'Copied!' : 'Copy' }}</button>
            </div>
            <pre class="code-body"><code>{{ frontmatterSnippet }}</code></pre>
          </div>
          <ul class="doc-list">
            <li><strong>Folders</strong> map directly to subdirectories on disk.</li>
            <li><strong>Metadata</strong> (ID, tags, pins, timestamps) is serialized in the frontmatter header.</li>
            <li><strong>Encrypted notes</strong> store ciphertext in the body with <code class="inline-code">encryptedWith</code> and <code class="inline-code">iv</code> fields in frontmatter.</li>
          </ul>
        </section>

        <hr class="doc-divider" />

        <!-- Security -->
        <section id="security" class="doc-section">
          <h2 class="doc-h2 font-display">Security Model</h2>
          <p class="doc-p">Aether Notes implements a zero-knowledge encryption architecture. No data ever leaves your machine.</p>

          <h3 class="doc-h3">2.1 Encryption</h3>
          <ul class="doc-list">
            <li><strong>Algorithm:</strong> AES-256-GCM via the native Web Crypto API.</li>
            <li><strong>Key Derivation:</strong> PBKDF2 with 100,000 iterations from a user-provided passphrase.</li>
            <li><strong>Zero-Knowledge:</strong> The decryption key exists only in memory and is never written to disk.</li>
            <li><strong>Passphrase Rotation:</strong> Re-encrypts all vault notes in a single batch when changed.</li>
          </ul>

          <h3 class="doc-h3">2.2 Tauri Capability Scoping</h3>
          <p class="doc-p">Filesystem access is explicitly scoped via <code class="inline-code">src-tauri/capabilities/default.json</code>. The app can only read/write within the <code class="inline-code">$DOCUMENT/Aether Notes</code> directory — no access to other parts of the filesystem.</p>
          <div class="doc-code-block">
            <div class="code-header">
              <span>capabilities/default.json (excerpt)</span>
              <button class="copy-btn" @click="copyText(capabilitiesSnippet)">{{ copied === capabilitiesSnippet ? 'Copied!' : 'Copy' }}</button>
            </div>
            <pre class="code-body"><code>{{ capabilitiesSnippet }}</code></pre>
          </div>
        </section>

        <hr class="doc-divider" />

        <!-- Prerequisites -->
        <section id="prerequisites" class="doc-section">
          <h2 class="doc-h2 font-display">Development Prerequisites</h2>
          <p class="doc-p">To build and develop Aether Notes locally, you need the following tools installed.</p>

          <h3 class="doc-h3">3.1 All Platforms</h3>
          <table class="doc-table">
            <thead>
              <tr>
                <th>Tool</th>
                <th>Version</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Node.js</strong></td>
                <td>v18+</td>
                <td>JavaScript runtime</td>
              </tr>
              <tr>
                <td><strong>Bun</strong> or npm</td>
                <td>latest</td>
                <td>Package manager</td>
              </tr>
              <tr>
                <td><strong>Rust</strong></td>
                <td>stable</td>
                <td>Tauri backend compilation</td>
              </tr>
            </tbody>
          </table>

          <h3 class="doc-h3">3.2 macOS</h3>
          <div class="doc-code-block">
            <div class="code-header">
              <span>Terminal</span>
              <button class="copy-btn" @click="copyText('xcode-select --install')">{{ copied === 'xcode-select --install' ? 'Copied!' : 'Copy' }}</button>
            </div>
            <pre class="code-body"><code>xcode-select --install</code></pre>
          </div>

          <h3 class="doc-h3">3.3 Linux (Debian/Ubuntu)</h3>
          <div class="doc-code-block">
            <div class="code-header">
              <span>Terminal</span>
              <button class="copy-btn" @click="copyText(linuxDepsCmd)">{{ copied === linuxDepsCmd ? 'Copied!' : 'Copy' }}</button>
            </div>
            <pre class="code-body"><code>{{ linuxDepsCmd }}</code></pre>
          </div>

          <h3 class="doc-h3">3.4 Windows</h3>
          <ul class="doc-list">
            <li><strong>Visual Studio Build Tools</strong> with the <strong>Desktop Development with C++</strong> workload enabled.</li>
            <li><strong>WebView2 Runtime</strong> — pre-installed on Windows 10/11.</li>
          </ul>
        </section>

        <hr class="doc-divider" />

        <!-- Development -->
        <section id="dev-pipeline" class="doc-section">
          <h2 class="doc-h2 font-display">Development &amp; Build</h2>
          <p class="doc-p">Clone the repository and install dependencies to get started.</p>

          <h3 class="doc-h3">4.1 Setup</h3>
          <div class="doc-code-block">
            <div class="code-header">
              <span>Terminal</span>
              <button class="copy-btn" @click="copyText(setupCmd)">{{ copied === setupCmd ? 'Copied!' : 'Copy' }}</button>
            </div>
            <pre class="code-body"><code>{{ setupCmd }}</code></pre>
          </div>

          <h3 class="doc-h3">4.2 Development Modes</h3>
          <table class="doc-table">
            <thead>
              <tr>
                <th>Command</th>
                <th>Mode</th>
                <th>Storage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code class="inline-code">npm run dev</code></td>
                <td>Web-only (browser)</td>
                <td>IndexedDB</td>
              </tr>
              <tr>
                <td><code class="inline-code">npx tauri dev</code></td>
                <td>Native desktop</td>
                <td>Filesystem (.md files)</td>
              </tr>
            </tbody>
          </table>

          <h3 class="doc-h3">4.3 Testing</h3>
          <div class="doc-code-block">
            <div class="code-header">
              <span>Terminal</span>
              <button class="copy-btn" @click="copyText('npm run test')">{{ copied === 'npm run test' ? 'Copied!' : 'Copy' }}</button>
            </div>
            <pre class="code-body"><code>npm run test</code></pre>
          </div>
          <p class="doc-p">Runs Vitest unit tests covering crypto key derivation, store integration, and encryption/decryption round-trips.</p>

          <h3 class="doc-h3">4.4 Production Build</h3>
          <div class="doc-code-block">
            <div class="code-header">
              <span>Terminal</span>
              <button class="copy-btn" @click="copyText('npx tauri build')">{{ copied === 'npx tauri build' ? 'Copied!' : 'Copy' }}</button>
            </div>
            <pre class="code-body"><code>npx tauri build</code></pre>
          </div>
          <p class="doc-p">Generates platform-specific installers in <code class="inline-code">src-tauri/target/release/bundle/</code>:</p>
          <ul class="doc-list">
            <li><strong>macOS:</strong> <code class="inline-code">.app</code> bundle + <code class="inline-code">.dmg</code> disk image</li>
            <li><strong>Windows:</strong> <code class="inline-code">.exe</code> installer + <code class="inline-code">.msi</code> package</li>
            <li><strong>Linux:</strong> <code class="inline-code">.AppImage</code> portable binary + <code class="inline-code">.deb</code> package</li>
          </ul>
        </section>

        <hr class="doc-divider" />

        <!-- CI/CD -->
        <section id="cicd" class="doc-section">
          <h2 class="doc-h2 font-display">CI/CD &amp; Releases</h2>
          <p class="doc-p">Cross-platform release builds are automated via GitHub Actions. Pushing a version tag triggers the full pipeline.</p>

          <h3 class="doc-h3">5.1 Release Workflow</h3>
          <div class="doc-steps">
            <div class="step">
              <div class="step-num">1</div>
              <div>
                <strong>Update version</strong>
                <p>Set the version in <code class="inline-code">src-tauri/tauri.conf.json</code> and <code class="inline-code">package.json</code>.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <div>
                <strong>Tag and push</strong>
                <p>Create a git tag matching <code class="inline-code">v*</code> and push it to trigger the workflow.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <div>
                <strong>Automated builds</strong>
                <p>GitHub Actions builds on 4 runners: macOS (Apple Silicon + Intel), Windows, and Ubuntu.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-num">4</div>
              <div>
                <strong>GitHub Release</strong>
                <p>All platform binaries are automatically attached to a GitHub Release page.</p>
              </div>
            </div>
          </div>
          <div class="doc-code-block">
            <div class="code-header">
              <span>Terminal</span>
              <button class="copy-btn" @click="copyText(releaseCmd)">{{ copied === releaseCmd ? 'Copied!' : 'Copy' }}</button>
            </div>
            <pre class="code-body"><code>{{ releaseCmd }}</code></pre>
          </div>

          <h3 class="doc-h3">5.2 Build Matrix</h3>
          <table class="doc-table">
            <thead>
              <tr>
                <th>Runner</th>
                <th>Target</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code class="inline-code">macos-latest</code></td>
                <td>aarch64-apple-darwin</td>
                <td><code class="inline-code">.dmg</code> (Apple Silicon)</td>
              </tr>
              <tr>
                <td><code class="inline-code">macos-latest</code></td>
                <td>x86_64-apple-darwin</td>
                <td><code class="inline-code">.dmg</code> (Intel)</td>
              </tr>
              <tr>
                <td><code class="inline-code">windows-latest</code></td>
                <td>x86_64-pc-windows-msvc</td>
                <td><code class="inline-code">.msi</code></td>
              </tr>
              <tr>
                <td><code class="inline-code">ubuntu-22.04</code></td>
                <td>x86_64-unknown-linux-gnu</td>
                <td><code class="inline-code">.AppImage</code> + <code class="inline-code">.deb</code></td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr class="doc-divider" />

        <!-- Key Files -->
        <section id="key-files" class="doc-section">
          <h2 class="doc-h2 font-display">Key Files Reference</h2>
          <p class="doc-p">Quick reference to the most important files in the codebase.</p>
          <table class="doc-table">
            <thead>
              <tr>
                <th>File</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code class="inline-code">src/lib/storage.ts</code></td>
                <td>StorageLayer interface, Tauri FS and IndexedDB implementations</td>
              </tr>
              <tr>
                <td><code class="inline-code">src/stores/notes.ts</code></td>
                <td>Note CRUD, auto-save, encryption, and concurrency control</td>
              </tr>
              <tr>
                <td><code class="inline-code">src/stores/folders.ts</code></td>
                <td>Folder hierarchy, drag-and-drop reordering</td>
              </tr>
              <tr>
                <td><code class="inline-code">src/lib/crypto.ts</code></td>
                <td>AES-256-GCM encryption, PBKDF2 key derivation</td>
              </tr>
              <tr>
                <td><code class="inline-code">src/components/editor/NoteEditor.vue</code></td>
                <td>Tiptap editor, outline, slash commands, bubble menu</td>
              </tr>
              <tr>
                <td><code class="inline-code">src-tauri/tauri.conf.json</code></td>
                <td>App name, version, window config, build commands</td>
              </tr>
              <tr>
                <td><code class="inline-code">src-tauri/capabilities/default.json</code></td>
                <td>Filesystem permission scopes</td>
              </tr>
              <tr>
                <td><code class="inline-code">.github/workflows/release.yml</code></td>
                <td>Cross-platform CI/CD release pipeline</td>
              </tr>
            </tbody>
          </table>
        </section>

      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import { useTheme } from '@/composables/useTheme';

const settingsStore = useSettingsStore();
useTheme();

const sidebarOpen = ref(false);
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function cycleTheme() {
  const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
  const nextIdx = (themes.indexOf(settingsStore.theme) + 1) % themes.length;
  settingsStore.setSetting('theme', themes[nextIdx]);
}

// Copy to clipboard helper
const copied = ref<string | null>(null);
function copyText(text: string) {
  navigator.clipboard.writeText(text);
  copied.value = text;
  setTimeout(() => {
    if (copied.value === text) {
      copied.value = null;
    }
  }, 2000);
}

// Snippet contents
const frontmatterSnippet = `---
id: abc123
folder: work
isPinned: false
isFavorite: true
isTrashed: false
createdAt: 1717756800000
updatedAt: 1717843200000
tags: ["project", "ideas"]
---
# My Note Title

This is the body of the note, written in standard Markdown.

- Supports **bold**, *italic*, and \`inline code\`
- Fully portable — edit with any text editor`;

const capabilitiesSnippet = `{
  "identifier": "fs:scope",
  "allow": [
    { "path": "$DOCUMENT/Aether Notes" },
    { "path": "$DOCUMENT/Aether Notes/**" }
  ]
}`;

const linuxDepsCmd = `sudo apt update
sudo apt install -y libgtk-3-dev libwebkit2gtk-4.1-dev \\
  libayatana-appindicator3-dev librsvg2-dev`;

const setupCmd = `git clone https://github.com/joshuasarmiento/aethernotes.git
cd aethernotes
npm install`;

const releaseCmd = `# Tag a new release
git tag v1.0.0
git push origin v1.0.0`;


// Active section tracking
const activeSection = ref('introduction');

const navSections = [
  {
    label: 'Getting Started',
    items: [
      { id: 'introduction', title: 'Introduction' },
      { id: 'installation', title: 'Installation & Launch' },
      { id: 'storage-location', title: 'Storage Location' },
    ],
  },
  {
    label: 'Features',
    items: [
      { id: 'rich-editor', title: 'Markdown Editor' },
      { id: 'vault-security', title: 'Vault & Encryption' },
      { id: 'file-org', title: 'Folders & Tags' },
      { id: 'command-palette', title: 'Command Palette' },
    ],
  },
  {
    label: 'How to Use',
    items: [
      { id: 'create-notes', title: 'Managing Notes' },
      { id: 'organize-notes', title: 'Organizing Notes' },
      { id: 'encrypt-notes', title: 'Encrypting Notes' },
      { id: 'keyboard-shortcuts', title: 'Keyboard Shortcuts' },
    ],
  },
  {
    label: 'Developer Reference',
    items: [
      { id: 'architecture', title: 'Architecture & Design' },
      { id: 'security', title: 'Security Model' },
    ],
  },
  {
    label: 'Setup',
    items: [
      { id: 'prerequisites', title: 'Prerequisites' },
      { id: 'dev-pipeline', title: 'Development & Build' },
    ],
  },
  {
    label: 'Deployment',
    items: [
      { id: 'cicd', title: 'CI/CD & Releases' },
    ],
  },
  {
    label: 'Reference',
    items: [
      { id: 'key-files', title: 'Key Files' },
    ],
  },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    activeSection.value = id;
    sidebarOpen.value = false;
  }
}

// Intersection observer for active section
let observer: IntersectionObserver | null = null;

onMounted(() => {
  document.body.style.overflow = 'auto';
  document.body.style.height = 'auto';

  const sections = document.querySelectorAll('.doc-section');
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
  );
  sections.forEach((s) => observer!.observe(s));

  // Scroll to hash if present in URL
  if (window.location.hash) {
    const hash = window.location.hash.slice(1);
    setTimeout(() => {
      scrollTo(hash);
    }, 100);
  }
});

onUnmounted(() => {
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';
  observer?.disconnect();
});
</script>

<style scoped>
.docs-page {
  background: var(--bg);
  color: var(--text-primary);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── Header ── */
.docs-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--topbar-height);
  background: var(--bg);
  border-bottom: 1px solid var(--border-subtle);
  z-index: 100;
}

.docs-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}

@media (min-width: 769px) {
  .docs-header-inner {
    padding: 0 var(--space-lg);
  }
}

.docs-logo-container {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
}

@media (min-width: 769px) {
  .sidebar-toggle {
    display: none;
  }
}

.docs-logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  text-decoration: none;
  color: var(--text-primary);
}

.logo-icon {
  color: var(--text-primary);
  flex-shrink: 0;
}

.docs-logo-text {
  font-size: 14px;
  font-weight: 500;
  font-family: 'Instrument Serif', Georgia, serif;
}

.docs-logo-badge {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 2px 6px;
  font-family: 'DM Mono', monospace;
}

.docs-header-right {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  transition: color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
}

.theme-toggle:hover {
  color: var(--text-primary);
  background: var(--hover-bg);
}

.launch-btn {
  text-decoration: none;
  background: var(--text-primary);
  color: var(--bg);
  padding: 6px 14px;
  border-radius: var(--radius);
  font-size: 11px;
  font-weight: 500;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.launch-btn:hover {
  opacity: 0.8;
}

/* ── Layout ── */
.docs-layout {
  display: block;
  width: 100%;
  padding-top: var(--topbar-height);
  flex: 1;
}

@media (min-width: 769px) {
  .docs-layout {
    display: flex;
    max-width: 1280px;
    margin: 0 auto;
  }
}

/* ── Sidebar ── */
.docs-sidebar {
  position: fixed;
  top: var(--topbar-height);
  left: 0;
  bottom: 0;
  width: 260px;
  z-index: 1000;
  background: var(--bg);
  transform: translateX(-100%);
  transition: transform var(--duration-base) var(--ease-out);
  border-right: 1px solid var(--border-subtle);
  padding: var(--space-lg);
  height: calc(100vh - var(--topbar-height));
  overflow-y: auto;
}

.docs-sidebar.is-open {
  transform: translateX(0);
}

@media (min-width: 769px) {
  .docs-sidebar {
    position: sticky;
    top: var(--topbar-height);
    transform: none;
    width: 220px;
    height: calc(100vh - var(--topbar-height));
    padding: var(--space-xl) var(--space-md) var(--space-2xl);
    border-right: 1px solid var(--border-subtle);
    z-index: auto;
  }
}

.sidebar-backdrop {
  position: fixed;
  top: var(--topbar-height);
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 999;
}

@media (min-width: 769px) {
  .sidebar-backdrop {
    display: none;
  }
}

.nav-group {
  margin-bottom: var(--space-lg);
}

.nav-group-label {
  display: block;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  color: var(--text-muted);
  font-weight: 600;
  padding: 0 var(--space-sm);
  margin-bottom: var(--space-xs);
}

.nav-link {
  display: block;
  font-size: 12px;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 5px var(--space-sm);
  border-radius: var(--radius);
  transition: color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
  cursor: pointer;
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--hover-bg);
}

.nav-link.active {
  color: var(--text-primary);
  background: var(--accent-subtle);
  font-weight: 500;
}

/* ── Content ── */
.docs-content {
  width: 100%;
  padding: var(--space-md) var(--space-lg) var(--space-2xl);
}

@media (min-width: 769px) {
  .docs-content {
    flex: 1;
    min-width: 0;
    padding: var(--space-xl) var(--space-2xl);
    max-width: 780px;
  }
}

.doc-section {
  padding-top: var(--space-lg);
  margin-bottom: var(--space-lg);
  scroll-margin-top: calc(var(--topbar-height) + 24px);
}

.doc-divider {
  border: none;
  border-top: 1px solid var(--border-subtle);
  margin: var(--space-2xl) 0 0;
}

.doc-h1 {
  font-size: 32px;
  font-weight: normal;
  letter-spacing: -0.5px;
  margin-bottom: var(--space-md);
  color: var(--text-primary);
}

.doc-h2 {
  font-size: 24px;
  font-weight: normal;
  letter-spacing: -0.3px;
  margin-bottom: var(--space-md);
  color: var(--text-primary);
}

.doc-h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin: var(--space-lg) 0 var(--space-sm);
  font-family: 'DM Mono', monospace;
  letter-spacing: -0.1px;
}

.doc-p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: var(--space-md);
  font-family: 'DM Mono', monospace;
}

.doc-list {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.doc-list li {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.7;
  padding-left: var(--space-md);
  position: relative;
  font-family: 'DM Mono', monospace;
}

.doc-list li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: var(--text-muted);
}

.doc-link {
  color: var(--text-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--border);
  transition: text-decoration-color var(--duration-fast) var(--ease-out);
}

.doc-link:hover {
  text-decoration-color: var(--text-primary);
}

/* ── Callout ── */
.doc-callout {
  border-radius: var(--radius);
  padding: var(--space-md);
  font-size: 12px;
  line-height: 1.65;
  margin: var(--space-md) 0;
  font-family: 'DM Mono', monospace;
}

.doc-callout.info {
  background: var(--accent-subtle);
  color: var(--text-primary);
}

.doc-callout.warning {
  background: rgba(217, 115, 13, 0.06);
  color: var(--text-primary);
}

/* ── Table ── */
.doc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin: var(--space-md) 0;
  font-family: 'DM Mono', monospace;
}

.doc-table th {
  text-align: left;
  padding: var(--space-sm) var(--space-md);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  font-weight: 600;
  border-bottom: 1px solid var(--border);
}

.doc-table td {
  padding: var(--space-sm) var(--space-md);
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
  line-height: 1.5;
}

.doc-table tr:last-child td {
  border-bottom: none;
}

.doc-table tr:hover td {
  background: var(--hover-bg);
}

/* ── Code ── */
.inline-code {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  background: var(--accent-subtle);
  color: var(--text-primary);
  padding: 1px 5px;
  border-radius: 3px;
  border: 1px solid var(--border);
}

.doc-code-block {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: var(--space-md) 0;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-sunken);
  padding: var(--space-sm) var(--space-md);
  font-size: 10px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.copy-btn {
  font-size: 10px;
  font-family: 'DM Mono', monospace;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 2px 8px;
  border-radius: 3px;
  cursor: pointer;
  transition: color var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
}

.copy-btn:hover {
  color: var(--text-primary);
  background: var(--hover-bg);
}

.code-body {
  margin: 0;
  padding: var(--space-md);
  background: var(--bg-elevated);
  overflow-x: auto;
}

.code-body code {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  color: var(--text-primary);
  line-height: 1.7;
}

/* ── Steps ── */
.doc-steps {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin: var(--space-md) 0;
}

.step {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
}

.step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--text-primary);
  color: var(--bg);
  font-size: 11px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: 'DM Mono', monospace;
  margin-top: 2px;
}

.step strong {
  display: block;
  font-size: 13px;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
  font-family: 'DM Mono', monospace;
}

.step p {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.65;
  margin: 0;
  font-family: 'DM Mono', monospace;
}

/* ── kbd ── */
kbd {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  background: var(--bg-sunken);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 2px 6px;
  color: var(--text-primary);
  white-space: nowrap;
}
</style>
