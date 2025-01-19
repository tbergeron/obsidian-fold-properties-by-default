import { Plugin } from 'obsidian';

export default class FoldPropertiesByDefault extends Plugin {

	// fold properties function
	foldProperties() {
		const commands = (this.app as any).commands;
		commands.executeCommandById('editor:toggle-fold-properties')
	}

	async onload() {
		// call foldProperties when a file is opened / showed
		this.registerEvent(this.app.workspace.on("file-open", this.foldProperties.bind(this)))
	}
}
