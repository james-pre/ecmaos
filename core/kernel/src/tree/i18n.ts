export * from 'i18next';
import resources from 'virtual:i18next-loader';

import { init as init, type InitOptions, default as _ } from 'i18next';

export const defaultOptions: InitOptions = {
	resources,
	lng: 'en',
	fallbackLng: 'en',
	ns: ['common', 'kernel'],
	defaultNS: 'common',
	interpolation: {
		escapeValue: false,
	},
};

export function language() { return _.language };


export function kinit(_options?: InitOptions) {
	const options = { ...defaultOptions, ..._options };

	init(options);
}
