import * as vscode from 'vscode';
import { join } from 'path';
import { homedir } from 'os';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { Document } from 'yaml';

const WARP_DIR = join(homedir(), '.warp', 'themes');

export function warpDirExists() {
	return existsSync(WARP_DIR);
}

export function createWarpDir() {
	mkdirSync(WARP_DIR, { recursive: true });
}

export function writeWarpConfig(config: any) {
	const { colors, kind } = config;
	colors.details = kind === 1 ? 'lighter' : 'darker';

	const theme = new Document(colors);
	theme.contents = colors;

	writeFileSync(join(WARP_DIR, 'vs_code.yaml'), theme.toString());

	vscode.window.showInformationMessage('Restart Warp to apply the theme ✨');
}

export default {
	warpDirExists,
	createWarpDir,
	writeWarpConfig,
};
