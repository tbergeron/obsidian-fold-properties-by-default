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
		console.warn('Folding properties')
		this.app.commands.executeCommandById('editor:toggle-fold-properties')
	}

	async onload() {
		this.registerEvent(this.app.workspace.on('file-open', this.foldProperties.bind(this)))
	}
}
