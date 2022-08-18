import * as vscode from 'vscode';
import { readFileSync } from 'fs';

export async function welcomeMessage() {
	const message = [
		'Welcome to Warp-Companion 🧙🏻‍♂️',
		'Open Warp and select the "Vs Code" Theme from the Theme Picker (⌘+P).',
		'After restarting Warp, your theme will be applied.',
	];

	vscode.window.showInformationMessage(message.join('\n'), 'Ok ✅');

	setTimeout(() => {
		vscode.window
			.showWarningMessage(
				'When using this extension your VS-Code Theme Picker will have some issues. These currently are inevitable.',
				'Learn more about it 🔗'
			)
			.then(() => {
				vscode.env.openExternal(vscode.Uri.parse('https://github.com/trbnhck/warp-companion#issues'));
			});
	}, 10000);
}

export async function initialActiviation(context: vscode.ExtensionContext) {
	const activated = context.globalState.get('activated');

	if (!activated) {
		await context.globalState.update('activated', true);
		return true;
	}

	return false;
}

export async function getColors(callback: any, kind?: number) {
	const panel = vscode.window.createWebviewPanel('warp-companion', 'warp-companion-panel', vscode.ViewColumn.One, {
		enableScripts: true,
	});
	panel.webview.html = readFileSync('./dist/webview.html').toString();

	panel.webview.onDidReceiveMessage((colors) => {
		if (!kind) {
			kind = 2;
		}

		callback({ colors, kind });
		panel.dispose();
	});
}
