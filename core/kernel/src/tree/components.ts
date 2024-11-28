import type { ComponentListener } from '@ecmaos/types';

/**
 * The Components (plural) class provides a registry for custom elements (Web Components) within the kernel.
 *
 */

export const components: Map<string, CustomElementConstructor> = new Map();

export function names() {
	return Array.from(components.keys());
}

export function define(name: string, component: CustomElementConstructor) {
	components.set(name, component);
	return globalThis.customElements.define(name, component);
}

export function get(name: string) {
	return components.get(name);
}

export function getName(component: CustomElementConstructor) {
	return globalThis.customElements.getName(component);
}

export function has(name: string) {
	return components.has(name);
}

export function upgrade(root: Node) {
	return globalThis.customElements.upgrade(root);
}

export function whenDefined(name: string) {
	return globalThis.customElements.whenDefined(name);
}

/**
 * The Component (singular) class extends the HTMLElement class to provide a base class for custom elements.
 *
 */
export class Component extends HTMLElement {
	static observedAttributes = ['data'];

	private _data: unknown;
	private _listeners: Map<string, Set<ComponentListener>> = new Map();

	get data() {
		return this._data;
	}
	get listeners() {
		return this._listeners;
	}

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		if (!this.shadowRoot) return;
		this.shadowRoot.innerHTML = `<h1>Hello World</h1>`;
	}

	adoptedCallback() {
		for (const listener of this._listeners.get('adopted') || []) listener(this);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === 'data') this._data = newValue;
		for (const listener of this._listeners.get('attributeChanged') || []) listener(name, oldValue, newValue);
	}

	connectedCallback() {
		for (const listener of this._listeners.get('connected') || []) listener(this);
	}

	disconnectedCallback() {
		for (const listener of this._listeners.get('disconnected') || []) listener(this);
	}
}
