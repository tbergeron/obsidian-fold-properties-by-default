import { Plugin } from 'obsidian'

declare module 'obsidian' {
	interface App {
		commands: {
			commands: { [commandId: string]: { id: string, name: string, callback: () => void } }
			executeCommandById(commandId: string): boolean
		}
	}
}

export default class FoldPropertiesByDefault extends Plugin {
	foldProperties() {
		const currentLeaf = document.querySelector('.workspace-leaf.mod-active')
		if (currentLeaf) {
			const propertiesAreFolded = currentLeaf.querySelector('.metadata-container.is-collapsed')
			if (!propertiesAreFolded) {
				console.warn('folding properties')
				this.app.commands.executeCommandById('editor:toggle-fold-properties')
			}
		}
	}

	async onload() {
		this.registerEvent(this.app.workspace.on('file-open', this.foldProperties.bind(this)))
	}
}
