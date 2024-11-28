/**
 * @alpha
 * @author Jay Mathis <code@mathis.network> (https://github.com/mathiscode)
 *
 * @remarks
 * The Kernel class is the core of the ecmaOS system.
 * It manages the system's resources and provides a framework for system services.
 *
 */

import chalk from 'chalk'
import figlet from 'figlet'
import Module from 'node:module'
import { Notyf } from 'notyf'
import { Credentials, credentials, DeviceDriver, DeviceFS } from '@zenfs/core'

import './../themes/default.scss'
import 'notyf/notyf.min.css'

import { Auth } from '#auth.ts'
import { Components } from '#components.ts'
import { DefaultDevices } from '#device.ts'
import { DefaultDomOptions, Dom } from '#dom.ts'
import { DefaultFilesystemOptions, Filesystem } from '#filesystem.ts'
import { DefaultLogOptions, Log } from '#log.ts'
import { Terminal } from '#terminal.ts'
import { Events } from '#events.ts'
import { I18n } from '#i18n.ts'
import { Intervals } from '#intervals.ts'
import { Memory } from '#memory.ts'
import { Process, ProcessManager } from '#processes.ts'
import { Protocol } from '#protocol.ts'
import { DefaultServiceOptions, Service } from '#service.ts'
import { Shell } from '#shell.ts'
import { Storage } from '#storage.ts'
import { Users } from '#users.ts'
import { Wasm } from '#wasm.ts'
import { Windows } from '#windows.ts'
import { Workers } from '#workers.ts'

import { TerminalCommands } from '#lib/commands/index.js'

import {
  KernelEvents,
  KernelState
} from '@ecmaos/types'

import type {
  BootOptions,
  Kernel as IKernel,
  KernelDevice,
  KernelExecuteEvent,
  KernelExecuteOptions,
  KernelOptions,
  KernelPanicEvent,
  Terminal as ITerminal,
  Wasm as IWasm,
  Windows as IWindows,
  Workers as IWorkers,
  EventCallback,
  ProcessEntryParams,
  FileHeader,
  KernelShutdownEvent
} from '@ecmaos/types'

const DefaultKernelOptions: KernelOptions = {
  dom: DefaultDomOptions,
  log: DefaultLogOptions,
  filesystem: DefaultFilesystemOptions,
  service: DefaultServiceOptions
}

const DefaultBootOptions: BootOptions = { silent: false }
const DefaultFigletFonts = [
  '3-D',
  '3x5',
  '3D-ASCII',
  '5 Line Oblique',
  'Acrobatic',
  'Big',
  'Big Money-ne',
  'Broadway',
  'Bubble',
  'Caligraphy',
  'Caligraphy2',
  'Coinstak',
  'Computer',
  'Cosmike',
  'Cyberlarge',
  'Diamond',
  'Doom',
  'Keyboard',
  'Larry 3D',
  'OS2',
  'Poison',
  'Rounded',
  'Runyc',
  'S Blood'
]

/**
 * @alpha
 * @author Jay Mathis <code@mathis.network> (https://github.com/mathiscode)
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
export class Kernel implements IKernel {
  public readonly id: string = crypto.randomUUID()
  public readonly name: string = import.meta.env['NAME']
  public readonly version: string = import.meta.env['VERSION']

  private _auth: Auth
  private _channel: BroadcastChannel
  private _components: Components
  private _dom: Dom
  private _devices: Map<string, { device: KernelDevice, drivers?: DeviceDriver[] }> = new Map()
  private _events: Events
  private _filesystem: Filesystem
  private _i18n: I18n
  private _intervals: Intervals
  private _keyboard: Keyboard
  private _log: Log | null
  private _memory: Memory
  private _options: KernelOptions
  private _packages: Map<string, Module> = new Map()
  private _processes: ProcessManager
  private _protocol: Protocol
  private _screensavers: Map<string, { default: (options: { terminal: ITerminal }) => Promise<void>, exit: () => Promise<void> }>
  private _service: Service
  private _shell: Shell
  private _state: KernelState = KernelState.BOOTING
  private _storage: Storage
  private _terminal: ITerminal
  private _toast: Notyf
  private _users: Users
  private _wasm: IWasm
  private _windows: IWindows
  private _workers: IWorkers

  get addEventListener() { return this.on }
  get removeEventListener() { return this.off }

  get auth() { return this._auth }
  get channel() { return this._channel }
  get components() { return this._components }
  get dom() { return this._dom }
  get devices() { return this._devices }
  get events() { return this._events }
  get filesystem() { return this._filesystem }
  get i18n() { return this._i18n }
  get intervals() { return this._intervals }
  get keyboard() { return this._keyboard }
  get log() { return this._log }
  get memory() { return this._memory }
  get options() { return this._options }
  get packages() { return this._packages }
  get processes() { return this._processes }
  get protocol() { return this._protocol }
  get screensavers() { return this._screensavers }
  get service() { return this._service }
  get shell() { return this._shell }
  get state() { return this._state }
  get storage() { return this._storage }
  get terminal() { return this._terminal }
  get toast() { return this._toast }
  get users() { return this._users }
  get wasm() { return this._wasm }
  get windows() { return this._windows }
  get workers() { return this._workers }

  constructor(_options: KernelOptions = DefaultKernelOptions) {
    this._options = { ...DefaultKernelOptions, ..._options }

    this._auth = new Auth()
    this._channel = new BroadcastChannel(import.meta.env['NAME'] || 'ecmaos')
    this._components = new Components()
    this._dom = new Dom(this.options.dom)
    this._devices = new Map<string, { device: KernelDevice, drivers?: DeviceDriver[] }>()
    this._events = new Events()
    this._filesystem = new Filesystem()
    this._i18n = new I18n(this.options.i18n)
    this._intervals = new Intervals()
    this._keyboard = navigator.keyboard
    this._log = this.options.log ? new Log(this.options.log) : null
    this._memory = new Memory()
    this._processes = new ProcessManager()
    this._protocol = new Protocol({ kernel: this })
    this._screensavers = new Map()
    this._service = new Service({ kernel: this, ...this.options.service })
    this._shell = new Shell({ kernel: this, uid: 0, gid: 0 })
    this._storage = new Storage({ kernel: this })
    this._terminal = new Terminal({ kernel: this, socket: this.options.socket })
    this._toast = new Notyf(this.options.toast)
    this._users = new Users({ kernel: this })
    this._windows = new Windows()
    this._wasm = new Wasm({ kernel: this })
    this._workers = new Workers()

    this._shell.attach(this._terminal)
  }

  /**
   * Boots the kernel and initializes all core services.
   * @param options - Boot configuration options
   * @throws {Error} If boot process fails
   */
  async boot(options: BootOptions = DefaultBootOptions) {
    let spinner
    const t = this.i18n.i18next.getFixedT(this.i18n.language, 'kernel')

    try {
      this.dom.topbar()
      this.terminal.unlisten()

      this.log?.attachTransport((logObj) => {
        if (!logObj?.['_meta']) return
        const acceptedLevels = ['WARN', 'ERROR']
        if (!acceptedLevels.includes(logObj['_meta'].logLevelName)) return

        let color = chalk.gray
        switch (logObj['_meta'].logLevelName) {
          case 'DEBUG': color = chalk.green; break
          case 'INFO': color = chalk.blue; break
          case 'WARN': color = chalk.yellow; break
          case 'ERROR': color = chalk.red; break
        }

        const numericKeys = Object.keys(logObj).filter(key => !isNaN(Number(key)))
        const logMessage = `${logObj['_meta'].name} ${color(logObj['_meta'].logLevelName)}\t${numericKeys.map(key => logObj[key]).join(' ') || logObj.message}`
        this.terminal.writeln(logMessage)
      })

      if (!options.silent && this.log) {
        const figletFont = options.figletFontRandom
          ? DefaultFigletFonts[Math.floor(Math.random() * DefaultFigletFonts.length)]
          : options.figletFont
            || getComputedStyle(document.documentElement).getPropertyValue('--figlet-font').trim()
            || 'Poison'
            

        const figletColor = options.figletColor
        || getComputedStyle(document.documentElement).getPropertyValue('--figlet-color').trim()
        || '#00FF00'

        const colorFiglet = (color: string, text: string) => {
          const rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
          if (rgb) return chalk.rgb(parseInt(rgb[1] ?? 'FF'), parseInt(rgb[2] ?? 'FF'), parseInt(rgb[3] ?? 'FF'))(text)
          if (color.startsWith('#')) return chalk.hex(color)(text)
          return (chalk as unknown as { [key: string]: (text: string) => string })[color]?.(text) || text
        }

        const loadedFont = await import(/* @vite-ignore */`/importable-fonts/${figletFont}.js`)
        figlet.parseFont(figletFont || 'Poison', loadedFont.default)

        const logoFiglet = figlet.textSync(import.meta.env['FIGLET_TEXT'] || 'ECMAOS', { font: figletFont as keyof typeof figlet.fonts })
        this.terminal.writeln(colorFiglet(figletColor, logoFiglet))
        this.terminal.writeln(`${this.terminal.createSpecialLink(import.meta.env['HOMEPAGE'], import.meta.env['NAME'] || 'ecmaOS')} v${import.meta.env['VERSION']}`)
        this.terminal.writeln(`${t('kernel.madeBy')} ${this.terminal.createSpecialLink(
          import.meta.env['AUTHOR']?.url || 'https://github.com/mathiscode',
          `${import.meta.env['AUTHOR']?.name} <${import.meta.env['AUTHOR']?.email}>`
        )}`)

        this.terminal.writeln(import.meta.env['REPOSITORY'] + '\n')
        this.terminal.writeln(chalk.red.bold(`🐉  ${t('kernel.experimental', 'EXPERIMENTAL')} 🐉`))

        if (import.meta.env['KNOWN_ISSUES']) {
          this.terminal.writeln(chalk.yellow.bold(t('kernel.knownIssues', 'Known Issues')))
          this.terminal.writeln(chalk.yellow(import.meta.env['KNOWN_ISSUES'].map((issue: string) => `- ${issue}`).join('\n')) + '\n')
        }

        if (import.meta.env['TIPS']) {
          this.terminal.writeln(chalk.green.bold(t('kernel.tips', 'Tips')))
          this.terminal.writeln(chalk.green(import.meta.env['TIPS'].map((tip: string) => `- ${tip}`).join('\n')) + '\n')
        }

        spinner = this.terminal.spinner('arrow3', chalk.yellow(this.i18n.t('Booting')))
        spinner.start()

        console.log(`%c${logoFiglet}`, 'color: green')
        console.log('%chttps://github.com/ecmaos/kernel', 'color: blue; text-decoration: underline; font-size: 16px')
        this.log.info(`${import.meta.env['NAME'] || 'ecmaOS'} v${import.meta.env['VERSION']}`)

        if (Notification?.permission === 'default') Notification.requestPermission()
        if (Notification?.permission === 'denied') this.log?.warn(t('kernel.permissionNotificationDenied'))

        this.intervals.set('title-blink', () => {
          globalThis.document.title = globalThis.document.title.includes('_') ? 'ecmaos# ' : 'ecmaos# _'
        }, 600)

        this.toast.success(`${import.meta.env['NAME']} v${import.meta.env['VERSION']}`)
      }

      await this.configure({ filesystem: Filesystem.options() })

      // We don't strictly conform to the FHS, but we try to follow it as closely as possible where relevant
      // User packages can use them as they see fit, and we'll find more uses for them as we go along
      const requiredPaths = [
        '/bin', '/sbin', '/boot', '/proc', '/tmp', '/home', '/lib', '/run', '/root', '/opt', '/sys',
        '/etc', '/etc/opt',
        '/var', '/var/cache', '/var/lib', '/var/log', '/var/spool', '/var/tmp', '/var/lock', '/var/opt', '/var/games',
        '/usr', '/usr/bin', '/usr/lib', '/usr/sbin', '/usr/share', '/usr/include', '/usr/local'
      ]

      const specialPermissions: Record<string, number> = {
        '/root': 0o700,
        '/proc': 0o777
      }

      for (const path of requiredPaths) {
        let mode = 0o755
        if (specialPermissions[path]) mode = specialPermissions[path]
        if (!(await this.filesystem.fs.exists(path))) await this.filesystem.fs.mkdir(path, { recursive: true, mode })
      }

      // Log to /var/log/kernel.log
      this.log?.attachTransport((logObj) => {
        if (!logObj._meta) return
        const formattedDate = new Date(logObj._meta.date).toLocaleString(this.memory.config.get('locale') as string || 'en-US', {
          year: 'numeric',
          month: '2-digit', 
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          fractionalSecondDigits: 3,
          hour12: false
        }).replace(',', '')

        this.sudo(() =>
          this.filesystem.fs.appendFile('/var/log/kernel.log',
            `${formattedDate} [${logObj._meta?.logLevelName}] ${logObj[0] || logObj.message}\n\n`
          )
        )
      })

      // Load core kernel features
      await this.registerEvents()
      await this.registerDevices()
      await this.registerCommands()
      await this.registerProc() // TODO: This will be revamped elsewhere or implemented as a procfs backend
      await this.registerPackages()

      this.intervals.set('/proc', this.registerProc.bind(this), import.meta.env['KERNEL_INTERVALS_PROC'] ?? 1000)

      // Setup screensavers
      const screensavers = import.meta.glob('./lib/screensavers/*.ts', { eager: true })
      for (const [key, saver] of Object.entries(screensavers)) {
        this._screensavers.set(
          key.replace('./lib/screensavers/', '').replace('.ts', ''),
          saver as { default: (options: { terminal: ITerminal }) => Promise<void>, exit: () => Promise<void> }
        )
      }

      const currentSaver = this.storage.local.getItem('screensaver') || 'matrix'
      if (currentSaver && this._screensavers.has(currentSaver)) {
        const saver = this._screensavers.get(currentSaver)

        let idleTimer: Timer
        const resetIdleTime = () => {
          clearTimeout(idleTimer)
          idleTimer = setTimeout(() => saver?.default({ terminal: this.terminal }), parseInt(this.storage.local.getItem('screensaver-timeout') ?? '60000'))
        }

        resetIdleTime()
        const events = ['mousemove', 'keydown', 'keyup', 'keypress', 'pointerdown']
        for (const event of events) globalThis.addEventListener(event, resetIdleTime)
      }

      // Setup root user or load existing users
      try {
        if (!await this.filesystem.fs.exists('/etc/passwd')) await this.users.add({ username: 'root', password: 'root', home: '/root' }, { noHome: true })
        else await this.users.load()
      } catch (err) {
        this.log?.error(err)
        this.terminal.writeln(chalk.red((err as Error).message))
        throw err
      }

      spinner?.stop()

      // Show login prompt or auto-login
      if (this.options.credentials) {
        const { cred } = await this.users.login(this.options.credentials.username, this.options.credentials.password)
        Object.assign(credentials, cred)
      } else {
        if (import.meta.env['VITE_APP_SHOW_DEFAULT_LOGIN'] === 'true') this.terminal.writeln('Default Login: root / root\n')
        while (true) {
          try {
            const username = await this.terminal.readline(`👤  ${this.i18n.t('Username')}: `)
            const password = await this.terminal.readline(`🔒  ${this.i18n.t('Password')}: `, true)
            const { cred } = await this.users.login(username, password)
            Object.assign(credentials, cred)
            break
          } catch (err) {
            console.error(err)
            this.terminal.writeln(chalk.red((err as Error).message) + '\n')
          }
        }
      }

      const user = this.users.get(credentials.uid ?? 0)
      if (!user) throw new Error(t('kernel.userNotFound'))
      this.shell.cwd = user.uid === 0 ? '/' : (user.home || '/')

      if (user.uid !== 0) {
        this.terminal.promptTemplate = `{user}:{cwd}$ `

        // TODO: find a way to freeze credentials without breaking sudo for the kernel's own use
        // Object.freeze(credentials)
      }

      // Init doesn't exit; tradition - init should become a more full-featured init system in the future
      class InitProcess extends Process { override async exit() {} }
      if (!await this.filesystem.fs.exists('/boot/init')) await this.filesystem.fs.writeFile('/boot/init', '#!ecmaos:script:init\n\n')

      const initProcess = new InitProcess({
        args: [],
        command: 'init',
        uid: user.uid,
        gid: user.gid?.[0] ?? 0,
        kernel: this,
        shell: this.shell,
        terminal: this.terminal,
        entry: async () => await this.sudo(async () => await this.execute({ command: '/boot/init', shell: this.shell }))
      })

      initProcess.start()
      this._state = KernelState.RUNNING
      this.terminal.write('\n' + this.terminal.prompt())
      this.terminal.focus()
      this.terminal.listen()
    } catch (error) {
      this.log?.error(error)
      this._state = KernelState.PANIC
      this.events.dispatch<KernelPanicEvent>(KernelEvents.PANIC, { error: error as Error })
      this.toast.error({
        message: t('kernel.panic'),
        duration: 0,
        dismissible: false
      })
    } finally {
      this.dom.topbar()
    }
  }

  /**
   * Configures kernel subsystems with the provided options
   * @param options - Configuration options for kernel subsystems
   */
  async configure(options: KernelOptions) {
    await this._filesystem.configure(options.filesystem ?? {})
  }

  /**
   * Executes a command in the kernel environment
   * @param options - Execution options containing command, args, and shell
   * @returns Exit code of the command
   */
  async execute(options: KernelExecuteOptions) {
    try {
      if (!await this.filesystem.exists(options.command)) {
        this.log?.error(`File not found for execution: ${options.command}`)
        return -1
      }

      if (options.command.startsWith('/dev/')) {
        const device = Array.from(this.devices.values())
          .find(d => d.drivers?.some(driver => driver.name === options.command.replace(/^\/dev\//, '')))

        if (device) return await this.executeDevice(device.device, options.args)
      }

      const header = await this.readFileHeader(options.command)
      if (!header) return -1

      let exitCode: number | void = -1
      switch (header.type) {
        case 'bin':
          switch (header.namespace) {
            case 'terminal': {
              if (!header.name) return -1
              exitCode = await this.executeCommand({ ...options, command: header.name })
              break
            }
          }; break
        case 'script':
          exitCode = await this.executeScript(options)
      }

      exitCode = exitCode ?? 0
      options.shell.env.set('?', exitCode.toString())
      this.events.dispatch<KernelExecuteEvent>(KernelEvents.EXECUTE, { command: options.command, args: options.args, exitCode })
      return exitCode
    } catch (error) {
      console.error(error)
      this.log?.error(error)
      options.shell.env.set('?', '-1')
      return -1
    }
  }

  /**
   * Executes a terminal command
   * @param options - Execution options containing command name, args, shell, and terminal
   * @returns Exit code of the command
   */
  async executeCommand(options: KernelExecuteOptions): Promise<number> {
    const command = this.terminal.commands[options.command as keyof typeof this.terminal.commands]
    if (!command) return -1

    const process = new Process({
      uid: options.shell.credentials.uid,
      gid: options.shell.credentials.gid,
      args: options.args,
      command: options.command,
      kernel: options.kernel || this,
      shell: options.shell || this.shell,
      terminal: options.terminal || this.terminal,
      entry: async (params: ProcessEntryParams) => await command.run.call(params, params.pid, params.args),
      stdin: options.stdin,
      stdout: options.stdout,
      stderr: options.stderr
    })

    return await process.start()
  }

  /**
   * Executes a device command
   * @param {KernelDevice} device - Device to execute command on
   * @param {string[]} args - Command arguments
   * @param {Shell} shell - Shell instance
   * @returns {Promise<number>} Exit code of the device command
   */
  async executeDevice(device: KernelDevice, args: string[] = [], shell: Shell = this.shell): Promise<number> {
    if (!device || !device.cli) {
      this.log?.error(`Device not found or does not have a CLI`)
      return -1
    }

    let deviceProcess: Process | null = new Process({
      uid: shell.credentials.uid,
      gid: shell.credentials.gid,
      args,
      command: `/dev/${device.pkg.name}`,
      entry: async (params: ProcessEntryParams) => await device.cli?.({
        args: params.args,
        kernel: params.kernel,
        pid: params.pid,
        shell: params.shell,
        terminal: params.terminal
      }),
      kernel: this,
      shell,
      terminal: this.terminal
    })

    try {
      shell.setPositionalParameters([`/dev/${device.pkg.name}`, ...args])
      return await deviceProcess.start()
    } catch (error) {
      this.log?.error(error)
      this.terminal.writeln(chalk.red((error as Error).message))
      return -2
    } finally {
      deviceProcess = null
    }
  }

  /**
   * Executes a script file
   * @param options - Execution options containing script path and shell
   * @returns Exit code of the script
   */
  async executeScript(options: KernelExecuteOptions): Promise<number> {
    const header = await this.readFileHeader(options.command)
    if (!header) return -1

    if (header.type !== 'script') {
      this.log?.error(`File is not a script: ${options.command}`)
      return -1
    }

    const script = await this.filesystem.fs.readFile(options.command, 'utf-8')
    if (script) {
      for (const line of script.split('\n')) {
        if (line.startsWith('#') || line.trim() === '') continue
        await options.shell.execute(line)
      }

      return 0
    } else this.log?.error(`Script ${options.command} not found`)

    return -1
  }

  /**
   * Shows a system notification if permissions are granted
   * @param {string} title - Notification title
   * @param {NotificationOptions} options - Notification options
   * @returns {Promise<Notification|void>} The created notification or void if permissions denied
   */
  async notify(title: string, options: NotificationOptions = {}): Promise<void | Notification> {
    if (Notification?.permission === 'granted') return new Notification(title, options)
    await Notification.requestPermission()
  }

  /**
   * Removes an event listener from the kernel.
   * @param {KernelEvents} event - The event to remove the listener from.
   * @param {EventCallback} listener - The listener to remove.
   * @returns {void}
   */
  off(event: KernelEvents, listener: EventCallback): void {
    this._events.off(event, listener)
  }

  /**
   * Adds an event listener to the kernel.
   * @param {KernelEvents} event - The event to listen for.
   * @param {EventCallback} listener - The listener to add.
   * @returns {void}
   */
  on(event: KernelEvents, listener: EventCallback): void {
    this._events.on(event, listener)
  }

  /**
   * Reads and parses a file header to determine its type
   * @param {string} filePath - Path to the file
   * @returns {Promise<FileHeader|null>} Parsed header information or null if invalid
   */
  async readFileHeader(filePath: string): Promise<FileHeader | null> {
    const parseHeader = (header: string): FileHeader | null => {
      if (!header.startsWith('#!ecmaos')) return null

      const [type, namespace, name] = header.replace('#!ecmaos:', '').split(':')
      if (!type) return null
      return { type, namespace, name }
    }

    return new Promise((resolve, reject) => {
      try {
        if (!this.filesystem.fsSync.existsSync(filePath)) return resolve(null)
        const readable = this.filesystem.fsSync.createReadStream(filePath)
        readable.on('data', (chunk: Buffer) => resolve(parseHeader(chunk.toString().split('\n')[0] || '')))
        readable.on('error', (error: Error) => reject(error))
        readable.on('close', () => resolve(null))
      } catch (error) {
        this.log?.error(error)
        reject(error)
      }
    })
  }

  /**
   * Reboots the kernel by performing a shutdown and page reload
   */
  async reboot() {
    this.log?.warn(this.i18n.t('Rebooting'))
    await this.shutdown()
    globalThis.location.reload()
  }

  /**
   * Registers the terminal commands.
   * @returns {Promise<void>} A promise that resolves when the terminal commands are registered.
   */
  async registerCommands() {
    if (!await this.filesystem.fs.exists('/bin')) await this.filesystem.fs.mkdir('/bin')
    const whitelistedCommands = Object.entries(TerminalCommands(this, this.shell, this.terminal)).filter(([name]) => !this.options.blacklist?.commands?.includes(name))
    for (const [name] of whitelistedCommands) {
      if (await this.filesystem.fs.exists(`/bin/${name}`)) continue
      await this.filesystem.fs.writeFile(`/bin/${name}`, `#!ecmaos:bin:terminal:${name}`, { mode: 0o755 })
    }
  }

  /**
   * Registers the devices.
   * @returns {Promise<void>} A promise that resolves when the devices are registered.
   */
  async registerDevices() {
    const devfs = this.filesystem.mounts.get('/dev') as DeviceFS
    for (const dev of Object.values(DefaultDevices)) {
      const drivers = await dev.getDrivers(this)
      this.devices.set(dev.pkg.name, { device: dev, drivers })
      for (const driver of drivers) {
        devfs.createDevice(`/${driver.name}`, driver)
      }
    }
  }

  /**
   * Registers the kernel events.
   * @returns {Promise<void>} A promise that resolves when the events are registered.
   */
  async registerEvents() {
    for (const event of Object.values(KernelEvents)) {
      this.events.on(event, async (detail: unknown) => {
        switch (event) {
          case KernelEvents.PANIC:
            this.log?.fatal('KernelPanic:', detail)
            break
          // default:
          //   this.log?.debug('KernelEvent:', event, { command, args, exitCode })
        }
      })
    }
  }

  /**
   * Registers the packages.
   * @returns {Promise<void>} A promise that resolves when the packages are registered.
   */
  async registerPackages() {
    try {
      const packagesData = await this.filesystem.fs.readFile('/etc/packages', 'utf-8')
      const packages = JSON.parse(packagesData)
      for (const pkg of packages) {
        const pkgJson = await this.filesystem.fs.readFile(`/opt/${pkg.name}/${pkg.version}/package.json`, 'utf-8')
        const pkgData = JSON.parse(pkgJson)

        let mainFile = pkgData.browser || pkgData.module || pkgData.main
        if (typeof mainFile === 'object') {
          for (const key of Object.keys(mainFile)) {
            if (typeof mainFile[key] === 'string') {
              mainFile = mainFile[key]
              break
            }
          }
        }

        if (!mainFile) {
          this.log?.warn(`No main entry point found for package ${pkg.name}`)
          continue
        }

        try {
          const filePath = `/opt/${pkg.name}/${pkg.version}/${mainFile}`
          const fileContents = await this.filesystem.fs.readFile(filePath, 'utf-8')

          const type = pkgData.type === 'module' || mainFile === pkgData.module ? 'module' : 'text/javascript'
          const blob = new Blob([fileContents], { type })
          const url = URL.createObjectURL(blob)
          
          try {
            this.log?.debug(`Loading package ${pkg.name} v${pkg.version}`)
            const imports = await import(/* @vite-ignore */ url)

            this._packages.set(pkg.name, imports as Module)
          } catch (err) {
            this.log?.error(`Failed to load package ${pkg.name} v${pkg.version}: ${err}`)
          } finally {
            URL.revokeObjectURL(url)
          }
        } catch (err) {
          this.log?.error(`Failed to read main file for package ${pkg.name} v${pkg.version}: ${err}`)
        }
      }
    } catch {}
  }

  /**
   * Registers the initial /proc entries.
   * @returns {Promise<void>} A promise that resolves when the proc entries are registered.
   */
  async registerProc() {
    if (!await this.filesystem.fs.exists('/proc')) await this.filesystem.fs.mkdir('/proc')

    const contents = {
      memory: '?',
      platform: navigator.userAgentData?.platform || navigator?.platform || navigator.userAgent,
      querystring: location.search,
      version: `${import.meta.env['NAME']} ${import.meta.env['VERSION']}`,
      language: navigator.language,
      host: location.host,
      userAgent: navigator.userAgent,
      userAgentData: navigator.userAgentData ? JSON.stringify(navigator.userAgentData, null, 2) : null,
      connection: JSON.stringify({
        downlink: 0,
        effectiveType: 'unknown',
        rtt: 0,
        saveData: false
      }, null, 2)
    }

    if ('connection' in navigator) {
      try {
        const { downlink, effectiveType, rtt, saveData } = navigator.connection as { downlink: number; effectiveType: string; rtt: number; saveData: boolean }
        contents.connection = JSON.stringify({ downlink, effectiveType, rtt, saveData }, null, 2)
      } catch {
        this.log?.warn('Failed to get connection data')
      }
    }

    if ('deviceMemory' in navigator) contents.memory = `>= ${navigator.deviceMemory}GB`

    for (const [key, value] of Object.entries(contents) as [string, string | null][]) {
      try {
        await this.filesystem.fs.writeFile(`/proc/${key}`, value ?? new Uint8Array(), { flag: 'w+', mode: 0o777 })
      } catch (error) {
        this.log?.warn(`Failed to write proc data: ${key}`, error)
      }
    }
  }

  /**
   * Replaces the kernel's filesystem.
   * @param {Filesystem} filesystem - The filesystem to replace the kernel's filesystem with.
   * @returns {Promise<void>} A promise that resolves when the filesystem is replaced.
   */
  async replaceFilesystem(filesystem: Filesystem) {
    this._filesystem = filesystem
  }

  /**
   * Shuts down the kernel.
   * @returns {Promise<void>} A promise that resolves when the kernel is shut down.
   */
  async shutdown() {
    this.terminal.unlisten()
    this._state = KernelState.SHUTDOWN
    this.events.dispatch<KernelShutdownEvent>(KernelEvents.SHUTDOWN, { data: {} })
  }

  /**
   * Executes an operation with root (or other) privileges
   * @param {() => Promise<T>} operation - Operation to execute
   * @param {Partial<Credentials>} cred - Optional credentials to use
   * @returns {Promise<T>} Result of the operation
   */
  private async sudo<T>(
    operation: () => Promise<T>,
    cred: Partial<Credentials> = { uid: 0, gid: 0 }
  ): Promise<T> {
    const currentCredentials = { ...credentials }
    try {
      Object.assign(credentials, { euid: 0, egid: 0, ...cred })
      return await operation()
    } finally {
      Object.assign(credentials, currentCredentials)
    }
  }
}
