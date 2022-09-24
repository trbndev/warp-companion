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
				vscode.env.openExternal(vscode.Uri.parse('https://github.com/haackt/warp-companion#issues'));
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
	panel.webview.html = `<script>
	const style = window.getComputedStyle(document.documentElement);
	const vscode = acquireVsCodeApi();

	vscode.postMessage({
		background: style.getPropertyValue('--vscode-editor-background'),
		accent: style.getPropertyValue('--vscode-button-background'),
		foreground: style.getPropertyValue('--vscode-editor-foreground'),
		details: '',
		terminal_colors: {
			normal: {
				black: style.getPropertyValue('--vscode-terminal-ansiBlack'),
				red: style.getPropertyValue('--vscode-terminal-ansiRed'),
				green: style.getPropertyValue('--vscode-terminal-ansiGreen'),
				yellow: style.getPropertyValue('--vscode-terminal-ansiYellow'),
				blue: style.getPropertyValue('--vscode-terminal-ansiBlue'),
				magenta: style.getPropertyValue('--vscode-terminal-ansiMagenta'),
				cyan: style.getPropertyValue('--vscode-terminal-ansiCyan'),
				white: style.getPropertyValue('--vscode-terminal-ansiWhite'),
			},
			bright: {
				black: style.getPropertyValue('--vscode-terminal-ansiBrightBlack'),
				red: style.getPropertyValue('--vscode-terminal-ansiBrightRed'),
				green: style.getPropertyValue('--vscode-terminal-ansiBrightGreen'),
				yellow: style.getPropertyValue('--vscode-terminal-ansiBrightYellow'),
				blue: style.getPropertyValue('--vscode-terminal-ansiBrightBlue'),
				magenta: style.getPropertyValue('--vscode-terminal-ansiBrightMagenta'),
				cyan: style.getPropertyValue('--vscode-terminal-ansiBrightCyan'),
				white: style.getPropertyValue('--vscode-terminal-ansiBrightWhite'),
			},
		},
	});
</script>`;

	panel.webview.onDidReceiveMessage((colors) => {
		if (!kind) {
			kind = 2;
		}

		callback({ colors, kind });
		panel.dispose();
	});
}
