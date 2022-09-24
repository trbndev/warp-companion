import * as vscode from 'vscode';
import Warp from './warp';
import { initialActiviation, getColors, welcomeMessage } from './utils';

export async function activate(context: vscode.ExtensionContext) {
	if (!Warp.warpDirExists()) {
		Warp.createWarpDir();
	}

	vscode.window.onDidChangeActiveColorTheme(async ({ kind }) => {
		if (!Warp.warpDirExists()) {
			Warp.createWarpDir();
		}

		await getColors(Warp.writeWarpConfig, kind);
	});

	if (await initialActiviation(context)) {
		await getColors(Warp.writeWarpConfig);
		await welcomeMessage();
	}
}
