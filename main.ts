import { Plugin } from 'obsidian'

interface UnsafeAppInterface {
  commands: {
	commands: { [commandId: string]: { id: string, name: string, callback: () => void } }
    executeCommandById(commandId: string): boolean
  }
}

export default class FoldPropertiesByDefault extends Plugin {

	// fold properties function
	foldProperties() {
		const unsafeApp = this.app as unknown as UnsafeAppInterface
		unsafeApp.commands.executeCommandById('editor:toggle-fold-properties')
	}

	async onload() {
		this.registerEvent(this.app.workspace.on("file-open", this.foldProperties.bind(this)))
	}
}
