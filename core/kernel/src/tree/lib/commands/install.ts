import chalk from 'chalk'
import path from 'path'
import semver from 'semver'

import { CommandArgs } from './'

const install = async ({ kernel, shell, terminal, args }: CommandArgs) => {
  const [packageArg, registryArg] = (args as string[])
  if (!packageArg) {
    terminal.writeln(chalk.red('Usage: install <package-name>[@version]'))
    return 1
  }

  const spec = packageArg.match(/(@[^/]+\/[^@]+|[^@]+)(?:@([^/]+))?/)
  if (!spec) {
    terminal.writeln(chalk.red('Invalid package name format'))
    return 1
  }

  const registry = registryArg || 'https://registry.npmjs.org'
  const packageName = spec[1]
  let version = spec[2] || 'latest'

  if (!packageName) {
    terminal.writeln(chalk.red('Invalid package name format'))
    return 1
  }

  const url = `${registry}/${packageName}`
  const packageInfo = await globalThis.fetch(url)
  const data = await packageInfo.json()

  if (!data.versions || !data['dist-tags']) {
    terminal.writeln(chalk.red(`No versions found for ${packageName}`))
    return 1
  }

  if (version === 'latest') version = data['dist-tags'].latest
  else version = semver.maxSatisfying(Object.keys(data.versions), version) || version

  const packagePath = path.join('/usr/lib', packageName, version, 'package', 'package.json')
  if (await kernel.filesystem.fs.exists(packagePath)) {
    terminal.writeln(chalk.green(`${packageName} v${version} is already installed`))
    return 0
  }

  terminal.writeln(`Installing ${data.name} v${version} from ${registry}...`)

  const tarballUrl = data.versions[version]?.dist?.tarball
  const tarballChecksum = data.versions[version]?.dist?.shasum
  if (!tarballUrl || !tarballChecksum) {
    terminal.writeln(chalk.red(`No tarball URL or checksum found for ${packageName} v${version}`))
    return 1
  }

  const tarball = await globalThis.fetch(tarballUrl)
  const arrayBuffer = await tarball.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest('SHA-1', arrayBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const downloadChecksum = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  if (downloadChecksum !== tarballChecksum) {
    terminal.writeln(chalk.red(`Checksum verification failed. Expected ${tarballChecksum} but got ${downloadChecksum}`))
    return 1
  }

  const tarballFilename = `${data.name.replace('@', '').replace('/', '-')}-${version}.tar.gz`
  await kernel.filesystem.fs.writeFile(`/tmp/${tarballFilename}`, new Uint8Array(arrayBuffer))

  // TODO: Support user packages installed to user's home?
  const extractPath = `/usr/lib/${data.name}/${version}`
  if (await kernel.filesystem.fs.exists(extractPath)) await kernel.filesystem.fs.rm(extractPath, { recursive: true })

  await kernel.filesystem.fs.mkdir(extractPath, { mode: 0o755, recursive: true })
  await kernel.filesystem.extractTarball(`/tmp/${tarballFilename}`, extractPath)
  await kernel.filesystem.fs.unlink(`/tmp/${tarballFilename}`)
  terminal.writeln(chalk.green(`Installed ${data.name} v${version} to ${extractPath}`))

  // const packageEntry = { name: packageName, version: version }

  // try {
  //   let packages = []
  //   try {
  //     const packagesData = await kernel.filesystem.fs.readFile('/etc/packages', 'utf-8')
  //     if (packagesData) packages = JSON.parse(packagesData)
  //   } catch {}

  //   if (!packages.find((p: { name: string, version: string }) => p.name === packageName && p.version === version)) {
  //     packages.push(packageEntry)
  //     await kernel.filesystem.fs.writeFile('/etc/packages', JSON.stringify(packages, null, 2))
  //   }
  // } catch (error) {
  //   terminal.writeln(chalk.red(`Failed to update /etc/packages: ${error}`))
  // }

  // link any bins
  // const packagePath = path.join('/usr/lib', packageName, version, 'package', 'package.json')
  const packageData = await kernel.filesystem.fs.readFile(packagePath, 'utf-8')
  const packageJson = JSON.parse(packageData)
  try {
    if (packageJson.bin) {
      if (typeof packageJson.bin === 'string') {
        const binPath = path.join('/usr/lib', packageName, version, 'package', packageJson.bin)
        await kernel.filesystem.fs.symlink(binPath, path.join('/usr/bin', packageJson.name))
      } else if (typeof packageJson.bin === 'object') {
        for (const bin in packageJson.bin) {
          const binPath = path.join('/usr/lib', packageName, version, 'package', packageJson.bin[bin])
          await kernel.filesystem.fs.symlink(binPath, path.join('/usr/bin', bin))
        }
      }
    }
  } catch (error) {
    terminal.writeln(chalk.red(`Failed to link bins for ${packageName}@${version}: ${error}`))
  }

  // install dependencies
  if (packageJson.dependencies) {
    for (const dependency in packageJson.dependencies) {
      const packageSpec = `${dependency}${packageJson.dependencies[dependency] ? `@${packageJson.dependencies[dependency]}` : ''}`
      await install({ kernel, shell, terminal, args: [packageSpec, registryArg] })
    }
  }
}

export default install
