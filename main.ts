import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class FoldPropertiesByDefault extends Plugin {

	// fold properties function
	// foldProperties() {
	// 	const view = this.app.workspace.getActiveViewOfType(MarkdownView);
	// 	if (!view) return;

	// 	const editor = view.sourceMode.cmEditor;
	// 	const lineCount = editor.lineCount();
	// 	let line = 0;
	// 	while (line < lineCount) {
	// 		const lineText = editor.getLine(line);
	// 		if (lineText.startsWith("```properties")) {
	// 			// fold the properties block
	// 			editor.foldCode(CodeMirror.Pos(line));
	// 			// skip to the end of the block
	// 			while (line < lineCount) {
	// 				line++;
	// 				if (editor.getLine(line).startsWith("```")) {
	// 					break;
	// 				}
	// 			}
	// 		}
	// 		line++;
	// 	}
	// }

	// async onload() {
	// 	// call foldProperties when a file is opened / showed
	// 	this.registerEvent(this.app.workspace.on("file-open", this.foldProperties.bind(this)));
	// }
}
