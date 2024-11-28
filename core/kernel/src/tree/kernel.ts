/**
 * @alpha
 * @author Jay Mathis <code@manetwork> (https://github.com/mathiscode)
 *
 * @remarks
 * The Kernel class is the core of the ecmaOS system.
 * It manages the system's resources and provides a framework for system services.
 *
 */

import { Credentials, credentials, DeviceDriver, DeviceFS } from "@zenfs/core";
import chalk from "chalk";
import figlet from "figlet";
import Module from "node:module";
import { Notyf } from "notyf";

import { DefaultDevices } from "#device.ts";
import * as dom from "#dom.ts";
import { Events } from "#events.ts";
import * as fs from "#filesystem.ts";
import * as i18n from "#i18n.ts";
import * as intervals from "#intervals.ts";
import { DefaultLogOptions, Log } from "#log.ts";
import * as memory from "#memory.ts";
import { Process } from "#processes.ts";
import { Protocol } from "#protocol.ts";
import { DefaultServiceOptions, Service } from "#service.ts";
import { Shell } from "#shell.ts";
import { Storage } from "#storage.ts";
import { Terminal } from "#terminal.ts";
import { Users } from "#users.ts";
import { Wasm } from "#wasm.ts";
import { Windows } from "#windows.ts";
import { Workers } from "#workers.ts";
import "notyf/notyf.min.css";
import "./../themes/default.scss";

export * as auth from "#auth.ts";
export * as components from "#components.ts";
export { fs as filesystem };
export * as processes from "#processes.ts";

import { TerminalCommands } from "#lib/commands/index.js";

import { KernelEvents, KernelState } from "@ecmaos/types";

import type {
  BootOptions,
  EventCallback,
  FileHeader,
  Terminal as ITerminal,
  Wasm as IWasm,
  KernelDevice,
  KernelExecuteEvent,
  KernelExecuteOptions,
  KernelOptions,
  KernelPanicEvent,
  KernelShutdownEvent,
  ProcessEntryParams,
} from "@ecmaos/types";

const DefaultKernelOptions: KernelOptions = {
  dom: dom.defaultOptions,
  log: DefaultLogOptions,
  filesystem: fs.defaultOptions,
  service: DefaultServiceOptions,
};

const DefaultBootOptions: BootOptions = { silent: false };
const DefaultFigletFonts = [
  "3-D",
  "3x5",
  "3D-ASCII",
  "5 Line Oblique",
  "Acrobatic",
  "Big",
  "Big Money-ne",
  "Broadway",
  "Bubble",
  "Caligraphy",
  "Caligraphy2",
  "Coinstak",
  "Computer",
  "Cosmike",
  "Cyberlarge",
  "Diamond",
  "Doom",
  "Keyboard",
  "Larry 3D",
  "OS2",
  "Poison",
  "Rounded",
  "Runyc",
  "S Blood",
];

/**
 * @alpha
 * @author Jay Mathis <code@manetwork> (https://github.com/mathiscode)
 *
 * The Kernel class is the core of the ecmaOS system.
 * It manages the system's resources and provides a framework for system services.
 *
 * @returns {Kernel} The unbooted kernel instance.
 *
 * @example
 * ```javascript
 * const kernel = new Kernel()
 * await kernel.boot()
 * ```
 */
export const id: string = crypto.randomUUID();

export const name: string = import.meta.env["NAME"];

export const version: string = import.meta.env["VERSION"];

export const channel: BroadcastChannel = new BroadcastChannel(
  import.meta.env["NAME"] || "ecmaos",
);

export const devices = new Map<
  string,
  { device: KernelDevice; drivers?: DeviceDriver[] }
>();
export const events = new Events();

export const keyboard: Keyboard = navigator.keyboard;
export let log: Log | null;
export let options: KernelOptions;
export const packages: Map<string, Module> = new Map();

export let protocol: Protocol;
export const screensavers = new Map<
  string,
  {
    default: (options: { terminal: ITerminal }) => Promise<void>;
    exit: () => Promise<void>;
  }
>();
export let service: Service;
export let shell: Shell;
export let state: KernelState = KernelState.BOOTING;
export let storage: Storage;
export let terminal: ITerminal;
export let toast: Notyf;
export let users: Users;
export let wasm: IWasm;
export const windows: Windows = new Windows();
export const workers: Workers = new Workers();

export function init(options: KernelOptions = DefaultKernelOptions) {
  options = { ...DefaultKernelOptions, ...options };

  dom.init(options.dom);
  i18n.kinit(options.i18n);

  log = options.log ? new Log(options.log) : null;
  protocol = new Protocol({ kernel: this });
  service = new Service({ kernel: this, ...options.service });
  shell = new Shell({ kernel: this, uid: 0, gid: 0 });
  storage = new Storage({ kernel: this });
  terminal = new Terminal({ kernel: this, socket: options.socket });
  toast = new Notyf(options.toast);
  users = new Users({ kernel: this });
  wasm = new Wasm({ kernel: this });

  shell.attach(terminal);
}

export const addEventListener = on;

export const removeEventListener = off;

/**
 * Boots the kernel and initializes all core services.
 * @param options - Boot configuration options
 * @throws {Error} If boot process fails
 */
export async function boot(options: BootOptions = DefaultBootOptions) {
  let spinner;
  const t = i18n.getFixedT(i18n.language(), "kernel");

  try {
    dom.topbar();
    terminal.unlisten();

    log?.attachTransport((logObj) => {
      if (!logObj?.["_meta"]) return;
      const acceptedLevels = ["WARN", "ERROR"];
      if (!acceptedLevels.includes(logObj["_meta"].logLevelName)) return;

      let color = chalk.gray;
      switch (logObj["_meta"].logLevelName) {
        case "DEBUG":
          color = chalk.green;
          break;
        case "INFO":
          color = chalk.blue;
          break;
        case "WARN":
          color = chalk.yellow;
          break;
        case "ERROR":
          color = chalk.red;
          break;
      }

      const numericKeys = Object.keys(logObj).filter(
        (key) => !isNaN(Number(key)),
      );
      const logMessage = `${logObj["_meta"].name} ${color(logObj["_meta"].logLevelName)}\t${numericKeys.map((key) => logObj[key]).join(" ") || logObj.message}`;
      terminal.writeln(logMessage);
    });

    if (!options.silent && log) {
      const figletFont = options.figletFontRandom
        ? DefaultFigletFonts[
            Math.floor(Math.random() * DefaultFigletFonts.length)
          ]
        : options.figletFont ||
          getComputedStyle(document.documentElement)
            .getPropertyValue("--figlet-font")
            .trim() ||
          "Poison";

      const figletColor =
        options.figletColor ||
        getComputedStyle(document.documentElement)
          .getPropertyValue("--figlet-color")
          .trim() ||
        "#00FF00";

      const colorFiglet = (color: string, text: string) => {
        const rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (rgb)
          return chalk.rgb(
            parseInt(rgb[1] ?? "FF"),
            parseInt(rgb[2] ?? "FF"),
            parseInt(rgb[3] ?? "FF"),
          )(text);
        if (color.startsWith("#")) return chalk.hex(color)(text);
        return (
          (chalk as unknown as { [key: string]: (text: string) => string })[
            color
          ]?.(text) || text
        );
      };

      const loadedFont = await import(
        /* @vite-ignore */ `/importable-fonts/${figletFont}.js`
      );
      figlet.parseFont(figletFont || "Poison", loadedFont.default);

      const logoFiglet = figlet.textSync(
        import.meta.env["FIGLET_TEXT"] || "ECMAOS",
        { font: figletFont as keyof typeof figlet.fonts },
      );
      terminal.writeln(colorFiglet(figletColor, logoFiglet));
      terminal.writeln(
        `${terminal.createSpecialLink(import.meta.env["HOMEPAGE"], import.meta.env["NAME"] || "ecmaOS")} v${import.meta.env["VERSION"]}`,
      );
      terminal.writeln(
        `${t("kernel.madeBy")} ${terminal.createSpecialLink(
          import.meta.env["AUTHOR"]?.url || "https://github.com/mathiscode",
          `${import.meta.env["AUTHOR"]?.name} <${import.meta.env["AUTHOR"]?.email}>`,
        )}`,
      );

      terminal.writeln(import.meta.env["REPOSITORY"] + "\n");
      terminal.writeln(
        chalk.red.bold(`🐉  ${t("kernel.experimental", "EXPERIMENTAL")} 🐉`),
      );

      if (import.meta.env["KNOWN_ISSUES"]) {
        terminal.writeln(
          chalk.yellow.bold(t("kernel.knownIssues", "Known Issues")),
        );
        terminal.writeln(
          chalk.yellow(
            import.meta.env["KNOWN_ISSUES"]
              .map((issue: string) => `- ${issue}`)
              .join("\n"),
          ) + "\n",
        );
      }

      if (import.meta.env["TIPS"]) {
        terminal.writeln(chalk.green.bold(t("kernel.tips", "Tips")));
        terminal.writeln(
          chalk.green(
            import.meta.env["TIPS"].map((tip: string) => `- ${tip}`).join("\n"),
          ) + "\n",
        );
      }

      spinner = terminal.spinner("arrow3", chalk.yellow(i18n.t("Booting")));
      spinner.start();

      console.log(`%c${logoFiglet}`, "color: green");
      console.log(
        "%chttps://github.com/ecmaos/kernel",
        "color: blue; text-decoration: underline; font-size: 16px",
      );
      log.info(
        `${import.meta.env["NAME"] || "ecmaOS"} v${import.meta.env["VERSION"]}`,
      );

      if (Notification?.permission === "default")
        Notification.requestPermission();
      if (Notification?.permission === "denied")
        log?.warn(t("kernel.permissionNotificationDenied"));

      intervals.set(
        "title-blink",
        () => {
			globalThis.document.title = globalThis.document.title.includes("_")
            ? "ecmaos# "
            : "ecmaos# _";
        },
        600,
      );

      toast.success(
        `${import.meta.env["NAME"]} v${import.meta.env["VERSION"]}`,
      );
    }

    await fs.configure({ filesystem: fs.options() });

    // We don't strictly conform to the FHS, but we try to follow it as closely as possible where relevant
    // User packages can use them as they see fit, and we'll find more uses for them as we go along
    const requiredPaths = [
      "/bin",
      "/sbin",
      "/boot",
      "/proc",
      "/tmp",
      "/home",
      "/lib",
      "/run",
      "/root",
      "/opt",
      "/sys",
      "/etc",
      "/etc/opt",
      "/var",
      "/var/cache",
      "/var/lib",
      "/var/log",
      "/var/spool",
      "/var/tmp",
      "/var/lock",
      "/var/opt",
      "/var/games",
      "/usr",
      "/usr/bin",
      "/usr/lib",
      "/usr/sbin",
      "/usr/share",
      "/usr/include",
      "/usr/local",
    ];

    const specialPermissions: Record<string, number> = {
      "/root": 0o700,
      "/proc": 0o777,
    };

    for (const path of requiredPaths) {
      let mode = 0o755;
      if (specialPermissions[path]) mode = specialPermissions[path];
      if (!(await fs.promises.exists(path)))
        await fs.promises.mkdir(path, { recursive: true, mode });
    }

    // Log to /var/log/kernel.log
    log?.attachTransport((logObj) => {
      if (!logObj._meta) return;
      const formattedDate = new Date(logObj._meta.date)
        .toLocaleString((memory.config.get("locale") as string) || "en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          fractionalSecondDigits: 3,
          hour12: false,
        })
        .replace(",", "");

      sudo(() =>
        fs.promises.appendFile(
          "/var/log/kernel.log",
          `${formattedDate} [${logObj._meta?.logLevelName}] ${logObj[0] || logObj.message}\n\n`,
        ),
      );
    });

    // Load core kernel features
    await registerEvents();
    await registerDevices();
    await registerCommands();
    await registerProc(); // TODO: This will be revamped elsewhere or implemented as a procfs backend
    await registerPackages();

    intervals.set(
      "/proc",
      registerProc,
      import.meta.env["KERNEL_INTERVALS_PROC"] ?? 1000,
    );

    // Setup screensavers
    const _screensavers = import.meta.glob("./lib/screensavers/*.ts", {
      eager: true,
    });
    for (const [key, saver] of Object.entries(_screensavers)) {
      screensavers.set(
        key.replace("./lib/screensavers/", "").replace(".ts", ""),
        saver as {
          default: (options: { terminal: ITerminal }) => Promise<void>;
          exit: () => Promise<void>;
        },
      );
    }

    const currentSaver = storage.local.getItem("screensaver") || "matrix";
    if (currentSaver && screensavers.has(currentSaver)) {
      const saver = screensavers.get(currentSaver);

      let idleTimer: Timer;
      const resetIdleTime = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(
          () => saver?.default({ terminal: terminal }),
          parseInt(storage.local.getItem("screensaver-timeout") ?? "60000"),
        );
      };

      resetIdleTime();
      const events = [
        "mousemove",
        "keydown",
        "keyup",
        "keypress",
        "pointerdown",
      ];
      for (const event of events) globalThis.addEventListener(event, resetIdleTime);
    }

    // Setup root user or load existing users
    try {
      if (!(await fs.promises.exists("/etc/passwd")))
        await users.add(
          { username: "root", password: "root", home: "/root" },
          { noHome: true },
        );
      else await users.load();
    } catch (err) {
      log?.error(err);
      terminal.writeln(chalk.red((err as Error).message));
      throw err;
    }

    spinner?.stop();

    // Show login prompt or auto-login
    if (options.credentials) {
      const { cred } = await users.login(
        options.credentials.username,
        options.credentials.password,
      );
      Object.assign(credentials, cred);
    } else {
      if (import.meta.env["VITE_APP_SHOW_DEFAULT_LOGIN"] === "true")
        terminal.writeln("Default Login: root / root\n");
      while (true) {
        try {
          const username = await terminal.readline(
            `👤  ${i18n.t("Username")}: `,
          );
          const password = await terminal.readline(
            `🔒  ${i18n.t("Password")}: `,
            true,
          );
          const { cred } = await users.login(username, password);
          Object.assign(credentials, cred);
          break;
        } catch (err) {
          console.error(err);
          terminal.writeln(chalk.red((err as Error).message) + "\n");
        }
      }
    }

    const user = users.get(credentials.uid ?? 0);
    if (!user) throw new Error(t("kernel.userNotFound"));
    shell.cwd = user.uid === 0 ? "/" : user.home || "/";

    if (user.uid !== 0) {
      terminal.promptTemplate = `{user}:{cwd}$ `;

      // TODO: find a way to freeze credentials without breaking sudo for the kernel's own use
      // Object.freeze(credentials)
    }

    // Init doesn't exit; tradition - init should become a more full-featured init system in the future
    class InitProcess extends Process {
      override async exit() {}
    }
    if (!(await fs.promises.exists("/boot/init")))
      await fs.promises.writeFile("/boot/init", "#!ecmaos:script:init\n\n");

    const initProcess = new InitProcess({
      args: [],
      command: "init",
      uid: user.uid,
      gid: user.gid?.[0] ?? 0,
      kernel: this,
      shell: shell,
      terminal: terminal,
      entry: async () =>
        await sudo(
          async () => await execute({ command: "/boot/init", shell: shell }),
        ),
    });

    initProcess.start();
    state = KernelState.RUNNING;
    terminal.write("\n" + terminal.prompt());
    terminal.focus();
    terminal.listen();
  } catch (error) {
    log?.error(error);
    state = KernelState.PANIC;
    events.dispatch<KernelPanicEvent>(KernelEvents.PANIC, {
      error: error as Error,
    });
    toast.error({
      message: t("kernel.panic"),
      duration: 0,
      dismissible: false,
    });
  } finally {
    dom.topbar();
  }
}

/**
 * Configures kernel subsystems with the provided options
 * @param options - Configuration options for kernel subsystems
 */
export async function configure(options: KernelOptions) {
  await fs.configure(options.filesystem ?? {});
}

/**
 * Executes a command in the kernel environment
 * @param options - Execution options containing command, args, and shell
 * @returns Exit code of the command
 */
export async function execute(options: KernelExecuteOptions) {
  try {
    if (!(await fs.exists(options.command))) {
      log?.error(`File not found for execution: ${options.command}`);
      return -1;
    }

    if (options.command.startsWith("/dev/")) {
      const device = Array.from(devices.values()).find((d) =>
        d.drivers?.some(
          (driver) => driver.name === options.command.replace(/^\/dev\//, ""),
        ),
      );

      if (device) return await executeDevice(device.device, options.args);
    }

    const header = await readFileHeader(options.command);
    if (!header) return -1;

    let exitCode: number | void = -1;
    switch (header.type) {
      case "bin":
        switch (header.namespace) {
          case "terminal": {
            if (!header.name) return -1;
            exitCode = await executeCommand({
              ...options,
              command: header.name,
            });
            break;
          }
        }
        break;
      case "script":
        exitCode = await executeScript(options);
    }

    exitCode = exitCode ?? 0;
    options.shell.env.set("?", exitCode.toString());
    events.dispatch<KernelExecuteEvent>(KernelEvents.EXECUTE, {
      command: options.command,
      args: options.args,
      exitCode,
    });
    return exitCode;
  } catch (error) {
    console.error(error);
    log?.error(error);
    options.shell.env.set("?", "-1");
    return -1;
  }
}

/**
 * Executes a terminal command
 * @param options - Execution options containing command name, args, shell, and terminal
 * @returns Exit code of the command
 */
export async function executeCommand(
  options: KernelExecuteOptions,
): Promise<number> {
  const command =
    terminal.commands[options.command as keyof typeof terminal.commands];
  if (!command) return -1;

  const process = new Process({
    uid: options.shell.credentials.uid,
    gid: options.shell.credentials.gid,
    args: options.args,
    command: options.command,
    kernel: options.kernel || this,
    shell: options.shell || shell,
    terminal: options.terminal || terminal,
    entry: async (params: ProcessEntryParams) =>
      await command.run.call(params, params.pid, params.args),
    stdin: options.stdin,
    stdout: options.stdout,
    stderr: options.stderr,
  });

  return await process.start();
}

/**
 * Executes a device command
 * @param {KernelDevice} device - Device to execute command on
 * @param {string[]} args - Command arguments
 * @param {Shell} shell - Shell instance
 * @returns {Promise<number>} Exit code of the device command
 */
export async function executeDevice(
  device: KernelDevice,
  args: string[] = [],
  shell: Shell = shell,
): Promise<number> {
  if (!device || !device.cli) {
    log?.error(`Device not found or does not have a CLI`);
    return -1;
  }

  let deviceProcess: Process | null = new Process({
    uid: shell.credentials.uid,
    gid: shell.credentials.gid,
    args,
    command: `/dev/${device.pkg.name}`,
    entry: async (params: ProcessEntryParams) =>
      await device.cli?.({
        args: params.args,
        kernel: params.kernel,
        pid: params.pid,
        shell: params.shell,
        terminal: params.terminal,
      }),
    kernel: this,
    shell,
    terminal: terminal,
  });

  try {
    shell.setPositionalParameters([`/dev/${device.pkg.name}`, ...args]);
    return await deviceProcess.start();
  } catch (error) {
    log?.error(error);
    terminal.writeln(chalk.red((error as Error).message));
    return -2;
  } finally {
    deviceProcess = null;
  }
}

/**
 * Executes a script file
 * @param options - Execution options containing script path and shell
 * @returns Exit code of the script
 */
export async function executeScript(
  options: KernelExecuteOptions,
): Promise<number> {
  const header = await readFileHeader(options.command);
  if (!header) return -1;

  if (header.type !== "script") {
    log?.error(`File is not a script: ${options.command}`);
    return -1;
  }

  const script = await fs.promises.readFile(options.command, "utf-8");
  if (script) {
    for (const line of script.split("\n")) {
      if (line.startsWith("#") || line.trim() === "") continue;
      await options.shell.execute(line);
    }

    return 0;
  } else log?.error(`Script ${options.command} not found`);

  return -1;
}

/**
 * Shows a system notification if permissions are granted
 * @param {string} title - Notification title
 * @param {NotificationOptions} options - Notification options
 * @returns {Promise<Notification|void>} The created notification or void if permissions denied
 */
export async function notify(
  title: string,
  options: NotificationOptions = {},
): Promise<void | Notification> {
  if (Notification?.permission === "granted")
    return new Notification(title, options);
  await Notification.requestPermission();
}

/**
 * Removes an event listener from the kernel.
 * @param {KernelEvents} event - The event to remove the listener from.
 * @param {EventCallback} listener - The listener to remove.
 * @returns {void}
 */
export function off(event: KernelEvents, listener: EventCallback): void {
  events.off(event, listener);
}

/**
 * Adds an event listener to the kernel.
 * @param {KernelEvents} event - The event to listen for.
 * @param {EventCallback} listener - The listener to add.
 * @returns {void}
 */
export function on(event: KernelEvents, listener: EventCallback): void {
  events.on(event, listener);
}

/**
 * Reads and parses a file header to determine its type
 * @param {string} filePath - Path to the file
 * @returns {Promise<FileHeader|null>} Parsed header information or null if invalid
 */
export async function readFileHeader(
  filePath: string,
): Promise<FileHeader | null> {
  const parseHeader = (header: string): FileHeader | null => {
    if (!header.startsWith("#!ecmaos")) return null;

    const [type, namespace, name] = header.replace("#!ecmaos:", "").split(":");
    if (!type) return null;
    return { type, namespace, name };
  };

  return new Promise((resolve, reject) => {
    try {
      if (!fs.fsSync.existsSync(filePath)) return resolve(null);
      const readable = fs.fsSync.createReadStream(filePath);
      readable.on("data", (chunk: Buffer) =>
        resolve(parseHeader(chunk.toString().split("\n")[0] || "")),
      );
      readable.on("error", (error: Error) => reject(error));
      readable.on("close", () => resolve(null));
    } catch (error) {
      log?.error(error);
      reject(error);
    }
  });
}

/**
 * Reboots the kernel by performing a shutdown and page reload
 */
export async function reboot() {
  log?.warn(i18n.t("Rebooting"));
  await shutdown();
  globalThis.location.reload();
}

/**
 * Registers the terminal commands.
 * @returns {Promise<void>} A promise that resolves when the terminal commands are registered.
 */
export async function registerCommands() {
  if (!(await fs.promises.exists("/bin"))) await fs.promises.mkdir("/bin");
  const whitelistedCommands = Object.entries(
    TerminalCommands(this, shell, terminal),
  ).filter(([name]) => !options.blacklist?.commands?.includes(name));
  for (const [name] of whitelistedCommands) {
    if (await fs.promises.exists(`/bin/${name}`)) continue;
    await fs.promises.writeFile(
      `/bin/${name}`,
      `#!ecmaos:bin:terminal:${name}`,
      { mode: 0o755 },
    );
  }
}

/**
 * Registers the devices.
 * @returns {Promise<void>} A promise that resolves when the devices are registered.
 */
export async function registerDevices() {
  const devfs = fs.mounts.get("/dev") as DeviceFS;
  for (const dev of Object.values(DefaultDevices)) {
    const drivers = await dev.getDrivers(this);
    devices.set(dev.pkg.name, { device: dev, drivers });
    for (const driver of drivers) {
      devfs.createDevice(`/${driver.name}`, driver);
    }
  }
}

/**
 * Registers the kernel events.
 * @returns {Promise<void>} A promise that resolves when the events are registered.
 */
export async function registerEvents() {
  for (const event of Object.values(KernelEvents)) {
    events.on(event, async (detail: unknown) => {
      switch (event) {
        case KernelEvents.PANIC:
          log?.fatal("KernelPanic:", detail);
          break;
        // default:
        //   log?.debug('KernelEvent:', event, { command, args, exitCode })
      }
    });
  }
}

/**
 * Registers the packages.
 * @returns {Promise<void>} A promise that resolves when the packages are registered.
 */
export async function registerPackages() {
  try {
    const packagesData = await fs.promises.readFile("/etc/packages", "utf-8");
    const packages = JSON.parse(packagesData);
    for (const pkg of packages) {
      const pkgJson = await fs.promises.readFile(
        `/opt/${pkg.name}/${pkg.version}/package.json`,
        "utf-8",
      );
      const pkgData = JSON.parse(pkgJson);

      let mainFile = pkgData.browser || pkgData.module || pkgData.main;
      if (typeof mainFile === "object") {
        for (const key of Object.keys(mainFile)) {
          if (typeof mainFile[key] === "string") {
            mainFile = mainFile[key];
            break;
          }
        }
      }

      if (!mainFile) {
        log?.warn(`No main entry point found for package ${pkg.name}`);
        continue;
      }

      try {
        const filePath = `/opt/${pkg.name}/${pkg.version}/${mainFile}`;
        const fileContents = await fs.promises.readFile(filePath, "utf-8");

        const type =
          pkgData.type === "module" || mainFile === pkgData.module
            ? "module"
            : "text/javascript";
        const blob = new Blob([fileContents], { type });
        const url = URL.createObjectURL(blob);

        try {
          log?.debug(`Loading package ${pkg.name} v${pkg.version}`);
          const imports = await import(/* @vite-ignore */ url);

          packages.set(pkg.name, imports as Module);
        } catch (err) {
          log?.error(
            `Failed to load package ${pkg.name} v${pkg.version}: ${err}`,
          );
        } finally {
          URL.revokeObjectURL(url);
        }
      } catch (err) {
        log?.error(
          `Failed to read main file for package ${pkg.name} v${pkg.version}: ${err}`,
        );
      }
    }
  } catch {}
}

/**
 * Registers the initial /proc entries.
 * @returns {Promise<void>} A promise that resolves when the proc entries are registered.
 */
export async function registerProc() {
  if (!(await fs.promises.exists("/proc"))) await fs.promises.mkdir("/proc");

  const contents = {
    memory: "?",
    platform:
      navigator.userAgentData?.platform ||
      navigator?.platform ||
      navigator.userAgent,
    querystring: location.search,
    version: `${import.meta.env["NAME"]} ${import.meta.env["VERSION"]}`,
    language: navigator.language,
    host: location.host,
    userAgent: navigator.userAgent,
    userAgentData: navigator.userAgentData
      ? JSON.stringify(navigator.userAgentData, null, 2)
      : null,
    connection: JSON.stringify(
      {
        downlink: 0,
        effectiveType: "unknown",
        rtt: 0,
        saveData: false,
      },
      null,
      2,
    ),
  };

  if ("connection" in navigator) {
    try {
      const { downlink, effectiveType, rtt, saveData } =
        navigator.connection as {
          downlink: number;
          effectiveType: string;
          rtt: number;
          saveData: boolean;
        };
      contents.connection = JSON.stringify(
        { downlink, effectiveType, rtt, saveData },
        null,
        2,
      );
    } catch {
      log?.warn("Failed to get connection data");
    }
  }

  if ("deviceMemory" in navigator)
    contents.memory = `>= ${navigator.deviceMemory}GB`;

  for (const [key, value] of Object.entries(contents)) {
    try {
      await fs.promises.writeFile(`/proc/${key}`, value as string, {
        flag: "w+",
        mode: 0o777,
      });
    } catch (error) {
      log?.warn(`Failed to write proc data: ${key}`, error);
    }
  }
}

/**
 * Shuts down the kernel.
 * @returns {Promise<void>} A promise that resolves when the kernel is shut down.
 */
export async function shutdown() {
  terminal.unlisten();
  state = KernelState.SHUTDOWN;
  events.dispatch<KernelShutdownEvent>(KernelEvents.SHUTDOWN, { data: {} });
}

/**
 * Executes an operation with root (or other) privileges
 * @param {() => Promise<T>} operation - Operation to execute
 * @param {Partial<Credentials>} cred - Optional credentials to use
 * @returns {Promise<T>} Result of the operation
 */
async function sudo<T>(
  operation: () => Promise<T>,
  cred: Partial<Credentials> = { uid: 0, gid: 0 },
): Promise<T> {
  const currentCredentials = { ...credentials };
  try {
    Object.assign(credentials, { euid: 0, egid: 0, ...cred });
    return await operation();
  } finally {
    Object.assign(credentials, currentCredentials);
  }
}
