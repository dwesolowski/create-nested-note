import {
  Modal,
  Notice,
  normalizePath,
  Plugin,
  TAbstractFile,
  TFile,
  TFolder,
} from "obsidian";

class NestedNoteModal extends Modal {
  constructor(
    private readonly plugin: CreateNestedNotePlugin,
    private readonly parent: TFolder,
  ) {
    super(plugin.app);
  }

  onOpen(): void {
    const { contentEl } = this;
    this.setTitle("Create nested note");
    contentEl.empty();
    contentEl.addClass("create-nested-note-modal");
    contentEl.createEl("p", {
      text: `Create a folder and matching note in ${this.parent.isRoot() ? "the vault root" : this.parent.path}.`,
      cls: "create-nested-note-description",
    });

    const form = contentEl.createEl("form");
    const input = form.createEl("input", {
      attr: {
        type: "text",
        placeholder: "Note name",
        "aria-label": "Nested note name",
        autocomplete: "off",
      },
    });
    const errorEl = form.createDiv({ cls: "create-nested-note-error" });
    errorEl.setAttr("role", "alert");

    const actions = form.createDiv({ cls: "create-nested-note-actions" });
    const cancelButton = actions.createEl("button", {
      text: "Cancel",
      attr: { type: "button" },
    });
    const createButton = actions.createEl("button", {
      text: "Create",
      cls: "mod-cta",
      attr: { type: "submit" },
    });

    cancelButton.addEventListener("click", () => this.close());
    input.addEventListener("input", () => errorEl.empty());
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      void (async () => {
        errorEl.empty();
        input.disabled = true;
        createButton.disabled = true;

        try {
          await this.plugin.createNestedNote(this.parent, input.value);
          this.close();
        } catch (error) {
          errorEl.setText(error instanceof Error ? error.message : String(error));
          input.disabled = false;
          createButton.disabled = false;
          input.focus();
          input.select();
        }
      })();
    });

    window.setTimeout(() => input.focus(), 0);
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

export default class CreateNestedNotePlugin extends Plugin {
  onload(): void {
    this.registerEvent(
      this.app.workspace.on(
        "file-menu",
        (menu, file: TAbstractFile) => {
          const parent = file instanceof TFolder ? file : file.parent;
          if (!parent) return;

          menu.addItem((item) => {
            item
              .setTitle("Create nested note")
              .setIcon("folder-plus")
              .onClick(() => new NestedNoteModal(this, parent).open());
          });
        },
      ),
    );
  }

  async createNestedNote(parent: TFolder, rawName: string): Promise<TFile> {
    const name = this.validateName(rawName);
    const folderPath = normalizePath(
      [parent.path, name].filter(Boolean).join("/"),
    );
    const notePath = normalizePath(`${folderPath}/${name}.md`);

    if (this.app.vault.getAbstractFileByPath(folderPath)) {
      throw new Error(`“${folderPath}” already exists.`);
    }
    if (this.app.vault.getAbstractFileByPath(notePath)) {
      throw new Error(`“${notePath}” already exists.`);
    }

    let note: TFile;
    try {
      await this.app.vault.createFolder(folderPath);
      note = await this.app.vault.create(notePath, "");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Could not create the nested note: ${message}`);
    }

    try {
      await this.app.workspace.getLeaf(false).openFile(note);
    } catch {
      new Notice(`Created ${notePath}, but could not open it.`);
      return note;
    }

    new Notice(`Created ${notePath}`);
    return note;
  }

  private validateName(rawName: string): string {
    let name = rawName.trim();
    if (name.toLocaleLowerCase().endsWith(".md")) {
      name = name.slice(0, -3).trim();
    }

    if (!name) throw new Error("Enter a note name.");
    if (name === "." || name === "..") {
      throw new Error("Choose a different note name.");
    }
    const hasControlCharacter = Array.from(name).some(
      (character) => character.charCodeAt(0) < 32,
    );
    if (/[\\/:*?"<>|]/u.test(name) || hasControlCharacter) {
      throw new Error("The name cannot contain \\ / : * ? \" < > or |.");
    }
    if (/[. ]$/u.test(name)) {
      throw new Error("The name cannot end with a period or space.");
    }
    if (/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/iu.test(name)) {
      throw new Error("That name is reserved by the operating system.");
    }

    return name;
  }
}
