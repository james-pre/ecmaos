/**
 * These memory methods may not follow what you're used to when it comes to memory management,
 * and are mainly to be used for niche use-cases and experiments.
 *
 * A heap address holds an arbitrary amount of bytes, and is used to index a Uint8Array.
 * Using ArrayBuffers and DataViews is a more robust method of handling memory.
 *
 * @example
 * # Heap
 * const address = kernel.memory.allocate(1024);
 * kernel.memory.write(address, new Uint8Array(1024).fill(1));
 * const value = kernel.memory.read(address)
 *
 * # Stack
 * kernel.memory.push(value)
 * console.log(kernel.memory.peek())
 * kernel.memory.pop()
 *
 */

import type { Address, Config, Collection, Heap, Stack, StackFrame } from '@ecmaos/types';

export const config: Config = new Map<string, unknown>();
export const collection: Collection = new Set();
export const heap: Heap = new Map<Address, Uint8Array>();
export const stack: Stack = new Array<StackFrame>();

export function init() {
	config.set('bootTime', Date.now());
}

// Stack
export function push(value: StackFrame) {
	stack.push(value);
}

export function pop() {
	return stack.pop();
}

export function peek() {
	return stack[stack.length - 1];
}

// Heap
export function allocate(size: number) {
	const memory = new Uint8Array(size);
	const address = heap.size;
	heap.set(address, memory);
	return address;
}

export function free(address: Address) {
	heap.delete(address);
}

export function read(address: Address) {
	return heap.get(address);
}

export function write(address: Address, value: Uint8Array) {
	heap.set(address, value);
}

export function copy(source: Address, destination: Address) {
	const sourceMemory = read(source);
	const destinationMemory = read(destination);
	if (sourceMemory && destinationMemory) {
		destinationMemory.set(sourceMemory);
	} else {
		throw new Error('Invalid memory addresses');
	}
}

export function move(source: Address, destination: Address) {
	copy(source, destination);
	free(source);
}

export function compare(address1: Address, address2: Address) {
	const memory1 = read(address1);
	const memory2 = read(address2);
	if (memory1 && memory2) {
		return memory1.every((value: number, index: number) => value === memory2[index]);
	} else {
		throw new Error('Invalid memory addresses');
	}
}

export function search(value: Uint8Array): number {
	function findPattern(array1: Uint8Array, array2: Uint8Array) {
		for (let i = 0; i <= array1.length - array2.length; i++) {
			let match = true;
			for (let j = 0; j < array2.length; j++) {
				if (array1[i + j] !== array2[j]) {
					match = false;
					break;
				}
			}

			if (match) return true;
		}

		return false;
	}

	for (const [address, memory] of heap.entries()) {
		if (findPattern(memory, new Uint8Array(value))) return address;
	}

	return -1;
}
