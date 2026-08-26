import { Plugin, TFile } from 'obsidian'

declare module 'obsidian' {
	interface App {
		commands: {
			commands: { [commandId: string]: { id: string, name: string, callback: () => void } }
			executeCommandById(commandId: string): boolean
		}
	}
}

export default class FoldPropertiesByDefault extends Plugin {
	private static readonly INITIAL_FOLD_DELAY_MS = 300
	private static readonly FOLD_RETRY_DELAY_MS = 100
	private static readonly MAX_FOLD_ATTEMPTS = 17

	private pendingFoldTimeout: number | null = null

	foldProperties(file: TFile | null) {
		this.clearPendingFold()

		if (!file) {
			return
		}

		this.scheduleFold(file, 0)
	}

	private scheduleFold(file: TFile, attempt: number) {
		const delay = attempt === 0
			? FoldPropertiesByDefault.INITIAL_FOLD_DELAY_MS
			: FoldPropertiesByDefault.FOLD_RETRY_DELAY_MS

		this.pendingFoldTimeout = window.setTimeout(() => {
			this.pendingFoldTimeout = null

			if (this.app.workspace.getActiveFile() !== file) {
				return
			}

			const currentLeaf = activeDocument.querySelector('.workspace-leaf.mod-active')
			const metadataContainer = currentLeaf?.querySelector('.metadata-container')

			if (!metadataContainer) {
				if (attempt < FoldPropertiesByDefault.MAX_FOLD_ATTEMPTS) {
					this.scheduleFold(file, attempt + 1)
				}
				return
			}

			if (!metadataContainer.classList.contains('is-collapsed')) {
				this.app.commands.executeCommandById('editor:toggle-fold-properties')
			}
		}, delay)
	}

	private clearPendingFold() {
		if (this.pendingFoldTimeout !== null) {
			window.clearTimeout(this.pendingFoldTimeout)
			this.pendingFoldTimeout = null
		}
	}

	async onload() {
		this.app.workspace.onLayoutReady(() => {
			this.registerEvent(this.app.workspace.on('file-open', this.foldProperties.bind(this) as (file: TFile | null) => void))
			this.registerEvent(this.app.workspace.on('layout-change', () => {
				this.foldProperties(this.app.workspace.getActiveFile())
			}))
			this.foldProperties(this.app.workspace.getActiveFile())
		})
	}

	onunload() {
		this.clearPendingFold()
	}
}
