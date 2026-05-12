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
	foldProperties(file: TFile | null) {
		const currentLeaf = activeDocument.querySelector('.workspace-leaf.mod-active')
		if (currentLeaf) {
			const propertiesAreFolded = currentLeaf.querySelector('.metadata-container.is-collapsed')
			if (!propertiesAreFolded) {
				this.app.commands.executeCommandById('editor:toggle-fold-properties')
			}
		}
	}

	async onload() {
		this.registerEvent(this.app.workspace.on('file-open', this.foldProperties.bind(this) as (file: TFile | null) => void))
	}
}
