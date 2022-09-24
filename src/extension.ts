import * as vscode from 'vscode';
import Warp from './warp';
import { initialActiviation, getColors, welcomeMessage } from './utils';

export async function activate(context: vscode.ExtensionContext) {
	vscode.window.onDidChangeActiveColorTheme(async ({ kind }) => {
		if (!Warp.warpDirExists()) {
			Warp.createWarpDir();
		}
		await getColors(Warp.writeWarpConfig, kind);
	});

	if (await initialActiviation(context)) {
		if (!Warp.warpDirExists()) {
			Warp.createWarpDir();
		}
		await getColors(Warp.writeWarpConfig);
		await welcomeMessage();
	}
}
