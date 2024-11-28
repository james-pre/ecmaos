import type { IntervalMap } from '@ecmaos/types';

const intervals: IntervalMap = new Map();

export function get(name: string) {
	return intervals.get(name);
}

export function set(name: string, callback: () => void, interval: number) {
	const intervalId = setInterval(callback, interval);
	intervals.set(name, intervalId);
	return intervalId;
}

export function clear(name: string) {
	const interval = intervals.get(name);
	if (interval) {
		clearInterval(interval);
		intervals.delete(name);
	}
}
