import { Plugin } from 'obsidian';

declare module 'obsidian' {
	interface App {
		commands: {
			executeCommandById(commandId: string): boolean;
		};
	}
}

/**
 * Fold Properties By Default
 *
 * Automatically folds frontmatter properties when opening notes.
 * Uses MutationObserver to handle the race condition where the
 * 'file-open' event fires before the DOM is fully rendered.
 */
export default class FoldPropertiesByDefault extends Plugin {
	private observer: MutationObserver | null = null;

	async onload(): Promise<void> {
		// Wait for layout to be ready before registering events
		this.app.workspace.onLayoutReady(() => {
			this.registerEvent(
				this.app.workspace.on('file-open', () => this.scheduleFold())
			);

			this.registerEvent(
				this.app.workspace.on('layout-change', () => this.tryFold())
			);

			// Fold if a file is already open
			if (this.app.workspace.getActiveFile()) {
				this.scheduleFold();
			}
		});
	}

	onunload(): void {
		this.cleanupObserver();
	}

	/**
	 * Schedule a fold operation, waiting for the DOM if necessary.
	 */
	private scheduleFold(): void {
		this.cleanupObserver();

		// Try immediately - DOM might already be ready
		if (this.tryFold()) return;

		// Otherwise, watch for DOM changes
		this.observer = new MutationObserver(() => {
			if (this.tryFold()) {
				this.cleanupObserver();
			}
		});

		this.observer.observe(document.body, { childList: true, subtree: true });

		// Safety timeout to prevent indefinite observation
		setTimeout(() => this.cleanupObserver(), 2000);
	}

	/**
	 * Attempt to fold properties if they exist and aren't already folded.
	 * @returns true if fold was successful or already folded
	 */
	private tryFold(): boolean {
		const leaf = document.querySelector('.workspace-leaf.mod-active');
		if (!leaf) return false;

		const container = leaf.querySelector('.metadata-container');
		if (!container) return false;

		if (container.classList.contains('is-collapsed')) {
			return true; // Already folded
		}

		this.app.commands.executeCommandById('editor:toggle-fold-properties');
		return true;
	}

	private cleanupObserver(): void {
		if (this.observer) {
			this.observer.disconnect();
			this.observer = null;
		}
	}
}
