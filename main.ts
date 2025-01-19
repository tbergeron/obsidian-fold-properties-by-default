import { Plugin } from 'obsidian'

export default class FoldPropertiesByDefault extends Plugin {
	foldProperties() {
		const app = this.app as any
		const currentLeaf = document.querySelector('.workspace-leaf.mod-active')
		if (currentLeaf) {
			const propertiesAreFolded = currentLeaf.querySelector('.metadata-container.is-collapsed')
			if (!propertiesAreFolded) {
				console.warn('folding properties')
				app.commands.executeCommandById('editor:toggle-fold-properties')
			}
		}
	}

	async onload() {
		this.registerEvent(this.app.workspace.on('file-open', this.foldProperties.bind(this)))
	}
}
