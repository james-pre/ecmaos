import type { DomOptions } from '@ecmaos/types';

export const defaultOptions: DomOptions = { topbar: true };

export const document = globalThis.document;

export const window = globalThis.window;

let _topbar: boolean = false;
let _topbarShow: boolean = false;

export function init(_options: DomOptions = defaultOptions) {
	const options = { ...defaultOptions, ..._options };
	_topbar = options.topbar ?? true;
}

export async function topbar(show?: boolean) {
	if (!_topbar) return;
	const { default: topbar } = await import('topbar');
	_topbarShow = show ?? !_topbarShow;
	// @ts-ignore
	if (_topbarShow) topbar.show();
	else topbar.hide();
}
