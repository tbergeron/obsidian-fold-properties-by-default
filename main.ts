import { Plugin } from 'obsidian'

interface UnsafeAppInterface {
  commands: {
    commands: { [commandId: string]: any }
    executeCommandById(commandId: string): boolean
  }
}

export default class FoldPropertiesByDefault extends Plugin {

	// fold properties function
	foldProperties() {
		const unsafeApp = this.app as any as UnsafeAppInterface
		unsafeApp.commands.executeCommandById('editor:toggle-fold-properties')
	}

	async onload() {
		this.registerEvent(this.app.workspace.on("file-open", this.foldProperties.bind(this)))
	}
}
