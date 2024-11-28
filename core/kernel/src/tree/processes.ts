import { Events } from '#events.ts';

import { ProcessEvents, ProcessStatus } from '@ecmaos/types';

import type {
	Kernel,
	Shell,
	Terminal,
	Process as IProcess,
	ProcessEntryParams,
	ProcessOptions,
	ProcessesMap,
	ProcessExitEvent,
	ProcessPauseEvent,
	ProcessResumeEvent,
	ProcessStartEvent,
	ProcessStopEvent,
} from '@ecmaos/types';

export const all: ProcessesMap = new Map();

export function add(process: Process) {
	all.set(process.pid, process);
	return process.pid;
}

export function get(pid: number) {
	return all.get(pid);
}

export function pid() {
	return all.size;
}

export function remove(pid: number) {
	all.delete(pid);
}

export function spawn(parent: number, process: Process) {
	process.parent = parent;
	return add(process);
}

export class Process implements IProcess {
	public readonly args: string[];
	public readonly code?: number;
	public readonly command: string;
	public readonly cwd: string;
	public readonly entry: (params: ProcessEntryParams) => Promise<number | undefined | void>;
	public readonly events: Events;
	public readonly gid: number;
	public readonly kernel: Kernel;
	public readonly pid: number;
	public parent?: number;
	public readonly shell: Shell;
	public _status: ProcessStatus = 'stopped';
	public readonly stderr: WritableStream<Uint8Array>;
	public readonly stdin: ReadableStream<Uint8Array>;
	public readonly stdout: WritableStream<Uint8Array>;
	public readonly terminal: Terminal;
	public readonly uid: number;

	constructor(options: ProcessOptions) {
		if (!options.kernel) throw new Error('Kernel is required');
		this.args = options.args || [];
		this.command = options.command || '';
		this.cwd = options.cwd || options.shell?.cwd || '/';
		this.entry =
			options.entry ||
			((params: ProcessEntryParams) => {
				options.kernel?.log?.silly(params);
				return Promise.resolve(0);
			});
		this.events = new Events();
		this.gid = options.gid;
		this.kernel = options.kernel;
		this.pid = this.kernel.processes.pid();
		this.parent = options.parent;
		this.shell = options.shell || this.kernel.shell;
		this.terminal = options.terminal || this.kernel.terminal;
		this.uid = options.uid;

		this.stdin = options.stdin || this.terminal.getInputStream();
		this.stdout = options.stdout || this.terminal.stdout || new WritableStream();
		this.stderr = options.stderr || this.terminal.stderr || new WritableStream();

		this.kernel.processes.add(this as IProcess);
	}

	async cleanup() {
		this.events.clear();
		this.kernel.processes.remove(this.pid);
	}

	async exit(exitCode: number = 0) {
		this.code = exitCode;
		this._status = 'exited';
		await this.cleanup();
		this.events.emit<ProcessExitEvent>(ProcessEvents.EXIT, { pid: this.pid, code: exitCode });
	}

	pause() {
		this._status = 'paused';
		this.events.emit<ProcessPauseEvent>(ProcessEvents.PAUSE, { pid: this.pid });
	}

	resume() {
		this._status = 'running';
		this.events.emit<ProcessResumeEvent>(ProcessEvents.RESUME, { pid: this.pid });
	}

	async start() {
		this._status = 'running';
		this.events.emit<ProcessStartEvent>(ProcessEvents.START, { pid: this.pid });

		const exitCode = await this.entry({
			args: this.args,
			command: this.command,
			cwd: this.cwd,
			instance: this as IProcess,
			gid: this.gid,
			kernel: this.kernel,
			pid: this.pid,
			shell: this.shell,
			terminal: this.terminal,
			stdin: this.stdin,
			stdout: this.stdout,
			stderr: this.stderr,
			uid: this.uid,
		});

		await this.stop(exitCode || 0);
		return exitCode || 0;
	}

	async stop(exitCode?: number) {
		this._status = 'stopped';
		this.events.emit<ProcessStopEvent>(ProcessEvents.STOP, { pid: this.pid });
		await this.exit(exitCode ?? 0);
	}

	restart() {
		this.stop();
		this.start();
	}
}
