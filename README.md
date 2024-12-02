# The Web Kernel

[![Launch ecmaOS.sh](https://img.shields.io/badge/launch-ecmaos.sh-blue?style=for-the-badge)](https://ecmaos.sh)

[ecmaOS](https://ecmaos.sh) is a [browser-based operating system kernel](https://global.discourse-cdn.com/spiceworks/original/4X/8/7/b/87b7be8e7e2cd932affe5449dba69dc16e30d721.gif) and suite of applications written in TypeScript. It's the successor of [web3os](https://github.com/web3os-org/kernel).

The goal is to create a kernel and supporting apps that tie together modern web technologies and utilities to form an "operating system" that can run on modern browsers, not just to create a "desktop experience". Its main use case is to provide a consistent environment for running web apps, but it has features that allow for more powerful custom scenarios. The kernel could also be repurposed as a platform for custom applications, games, and more.

[![API Reference](https://img.shields.io/badge/API-Reference-success)](https://docs.ecmaos.sh)
[![Version](https://img.shields.io/github/package-json/v/ecmaos/ecmaos?color=success)](https://ecmaos.sh)
[![Site Status](https://img.shields.io/website?url=https%3A%2F%2Fecmaos.sh)](https://ecmaos.sh)
[![Created](https://img.shields.io/github/created-at/ecmaos/ecmaos?style=flat&label=created&color=success)](https://github.com/ecmaos/ecmaos/pulse)
[![Last Commit](https://img.shields.io/github/last-commit/ecmaos/ecmaos.svg)](https://github.com/ecmaos/ecmaos/commit/main)

[![Open issues](https://img.shields.io/github/issues/ecmaos/ecmaos.svg)](https://github.com/ecmaos/ecmaos/issues)
[![Closed issues](https://img.shields.io/github/issues-closed/ecmaos/ecmaos.svg)](https://github.com/ecmaos/ecmaos/issues?q=is%3Aissue+is%3Aclosed)
[![Open PRs](https://img.shields.io/github/issues-pr-raw/ecmaos/ecmaos.svg?label=PRs)](https://github.com/ecmaos/ecmaos/pulls)
[![Closed PRs](https://img.shields.io/github/issues-pr-closed/ecmaos/ecmaos.svg?label=PRs)](https://github.com/ecmaos/ecmaos/pulls?q=is%3Apr+is%3Aclosed)

[![Star on GitHub](https://img.shields.io/github/stars/ecmaos/ecmaos?style=flat&logo=github&label=⭐️)](https://github.com/ecmaos/ecmaos/stargazers)
[![Sponsors](https://img.shields.io/github/sponsors/mathiscode?color=red)](https://github.com/sponsors/mathiscode)
[![Contributors](https://img.shields.io/github/contributors/ecmaos/ecmaos?color=yellow)](https://github.com/ecmaos/ecmaos/graphs/contributors)
[![GitHub license](https://img.shields.io/badge/license-MIT+Apache2.0-blue)](https://github.com/ecmaos/ecmaos/blob/main/LICENSE)

[![Discord](https://img.shields.io/discord/1311804229127508081?label=discord&logo=discord&logoColor=white)](https://discord.gg/ZJYGkbVsCh)
[![Matrix](https://img.shields.io/matrix/ecmaos:matrix.org?label=%23ecmaos%3Amatrix.org&logo=matrix&logoColor=white)](https://matrix.to/#/#ecmaos:matrix.org)
[![Bluesky](https://img.shields.io/badge/follow-on%20Bluesky-blue?logo=bluesky&logoColor=white)](https://ecmaos.bsky.social)
[![Reddit](https://img.shields.io/reddit/subreddit-subscribers/ecmaos?style=flat&logo=reddit&logoColor=white&label=r/ecmaos)](https://www.reddit.com/r/ecmaos)

> Made with ❤️ by [Jay Mathis](https://jaymath.is)
>
> [![Stars](https://img.shields.io/github/stars/mathiscode?style=flat&logo=github&label=⭐️)](https://github.com/mathiscode) [![Followers](https://img.shields.io/github/followers/mathiscode?style=flat&logo=github&label=follow)](https://github.com/mathiscode)

## Features

- TypeScript, WebAssembly
- Filesystem supporting multiple backends powered by [zenfs](https://github.com/zen-fs/core)
- Terminal interface powered by [xterm.js](https://xtermjs.org)
- Pseudo-streams, allowing redirection and piping
- Device framework with a common interface for working with hardware: WebBluetooth, WebSerial, WebHID, WebUSB, etc.
- Some devices have a builtin CLI, so you can run them like normal commands: `# /dev/bluetooth`
- Install any client-side npm package (this doesn't mean it will work out of the box as expected)
- Event manager for dispatching and subscribing to events
- Process manager for running applications and daemons
- Interval manager for scheduling recurring operations
- Memory manager for managing pseudo-memory: Collections, Config, Heap, and Stack
- Storage manager for managing Storage API capabilities: IndexedDB, localStorage, etc.
- Internationalization framework for translating text powered by [i18next](https://www.i18next.com)
- Window manager powered by [WinBox](https://github.com/nextapps-de/winbox)
- `SWAPI`: An API server running completely inside a service worker using [Hono](https://hono.dev)
- `Metal`: An API server for allowing connections to physical systems from ecmaOS using [Hono](https://hono.dev)

## Basic Overview

- `Kernel`
  - Authentication (WebAuthn)
  - Components (Web Components/Custom Elements)
  - Devices
  - DOM
  - Events (CustomEvents)
  - Filesystem (ZenFS)
  - Internationalization (i18next)
  - Interval Manager (setInterval)
  - Log Manager (tslog)
  - Memory Manager (Abstractions)
  - Process Manager
  - Protocol Handlers (web+ecmaos://...)
  - Service Worker Manager
  - Shell
  - Storage (IndexedDB, localStorage, sessionStorage, etc.)
  - Terminal (xterm.js)
  - User Manager
  - WASM Loader
  - Window Manager (WinBox)
  - Workers (Web Workers)

- `BIOS`
  - The BIOS is a C++ module compiled to WebAssembly with [Emscripten](https://emscripten.org) providing performance-critical functionality
  - The BIOS has its own filesystem, located at `/bios`
  - The main idea is that data and custom code can be loaded into it from the OS for WASM-native performance, as well as providing various utilities
  - Confusingly, the Kernel loads the BIOS - not the other way around

- `Apps`
  - These are full applications that are developed to work with ecmaOS
- `Core`
  - Core modules provide the system's essential functionality; this includes the kernel itself
- `Commands`
  - Commands are small utilities that aren't quite full Apps, provided by the shell
- `Devices`
  - Devices get loaded on boot, e.g. /dev/bluetooth, /dev/random, /dev/battery, etc.
  - A device can support being "run" by a user, e.g. `# /dev/battery status`
  - Devices may also be directly read/written, and will behave accordingly
  - An individual device module can provide multiple device drivers, e.g. `/dev/usb` provides `/dev/usb-mydevice-0001-0002`
- `Utils`
  - Utilities used during development

## Command Examples

```sh
ai "Despite all my rage" # use env OPENAI_API_KEY --set sk-
cat /var/log/kernel.log
cd /tmp
echo "Hello, world!" > hello.txt
chmod 700 hello.txt
chown user hello.txt
clear
cp /tmp/hello.txt /tmp/hi.txt
download hello.txt
edit hello.txt
env hello --set world ; env
fetch https://ipecho.net/plain > /tmp/myip.txt
install jquery
ls /dev
mkdir /tmp/zip ; cd /tmp/zip
upload
mount myuploadedzip.zip /mnt/zip -t zip
cd .. ; pwd
unzip zip/myuploaded.zip
mv zip/myuploaded.zip /tmp/backup.zip
passwd old new
play /root/test.mp3
ps
rm /tmp/backup.zip
screensaver
snake
stat /tmp/hello.txt
touch /tmp/test.bin
umount /mnt/zip
user add --username user
su user
video /root/video.mp4
zip /root/tmp.zip /tmp
```

## Device Examples

```sh
/dev/audio test
/dev/battery status
/dev/bluetooth scan
echo "This will error" > /dev/full
/dev/gamepad list
/dev/geo position
/dev/gpu test
/dev/hid list
/dev/midi list
echo "Goodbye" > /dev/null
/dev/presentation start https://wikipedia.org
cat /dev/random --bytes 10
/dev/sensors list
/dev/serial devices
/dev/usb list
/dev/webgpu test
cat /dev/zero --bytes 10 > /dev/null
```

Note: many device implementations are incomplete, but provide a solid starting point

## Early Days

The kernel is currently in active development. It is not considered stable and the structure and API are very likely to change in unexpected and possibly unannounced ways until version 1.0.0. Use cautiously and at your own risk.

Things to keep in mind:

- Things have changed a lot since the tests were written, so they need to be updated and fixed
- The kernel is designed to be run in an environment with a DOM (i.e. a browser)
- Many features are only available on Chromium-based browsers, and many more behind feature flags
- Command interfaces won't match what you might be used to from a traditional Linux environment; not all commands and options are supported. Over time, Linuxish commands will be fleshed out and made to behave in a more familiar way.
- Globbing doesn't work in the terminal yet

## Development

[Turborepo](https://turbo.build/repo) is used to manage the monorepo, and [pnpm](https://pnpm.io) is used for package management.

A good place to start is viewing the `scripts` property of [package.json](./package.json) in the root of the repository.

```bash
# Clone
git clone https://github.com/ecmaos/ecmaos.git

# Install dependencies
cd ecmaos && pnpm install

# Run the dev server
pnpm run dev

# Run the docs server
pnpm run dev:docs

# Build
pnpm run build

# Run tests
pnpm run test
pnpm run test:watch
pnpm run test:coverage
pnpm run test:bench
pnpm run test:ui

# Generate modules
turbo gen device # generate a new device template
```

Also see [turbo.json](./turbo.json) and [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## Security Vulnerabilities

If you find a serious security vulnerability, please submit a new [Draft Security Advisory](https://github.com/ecmaos/ecmaos/security) or contact the project maintainer directly at [code@mathis.network](mailto:code@mathis.network).
