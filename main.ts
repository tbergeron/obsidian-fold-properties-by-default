import { Plugin } from 'obsidian'

interface FoldedProperties {
	folds: { from: number, to: number }[];
}

export default class FoldPropertiesByDefault extends Plugin {
	foldProperties() {
		const app = this.app as any

		const file = this.app.workspace.getActiveFile()
		if (!file) {
			return
		}

        const existingFolds: FoldedProperties | null = app.foldManager.loadPath(
            file.path
        )

		console.warn('existingFolds', existingFolds, 'isPropertiesFolded', existingFolds ? this.isPropertiesFolded(existingFolds) : null)

		// TODO: need to either find a different command or implement a way to check if it's already folded
		if (existingFolds && !this.isPropertiesFolded(existingFolds)) {
			app.commands.executeCommandById('editor:toggle-fold-properties')
		}
	}

    isPropertiesFolded(existingFolds: FoldedProperties) {
        return existingFolds.folds.some(
            (item) => item.from == 0 && item.to == 0
        )
    }

	async onload() {
		this.registerEvent(this.app.workspace.on('file-open', this.foldProperties.bind(this)))
	}
}
