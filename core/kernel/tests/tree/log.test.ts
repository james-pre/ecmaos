import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ILogObj, IMeta } from 'tslog'

import { Kernel } from '#kernel.ts'
import { Log } from '#log.ts'
import { DefaultFilesystemOptionsTest } from '#filesystem.ts'

describe('Log', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should log', () => {
    const log = new Log({ name: 'ecmaos:kernel:test', silent: true })

    vi.spyOn(log, 'debug')
    vi.spyOn(log, 'info')
    vi.spyOn(log, 'warn')
    vi.spyOn(log, 'error')
    vi.spyOn(log, 'fatal')

    log.debug('Testing debug')
    log.info('Testing info')
    log.warn('Testing warn')
    log.error('Testing error')
    log.fatal('Testing fatal')

    expect(log.debug).toHaveBeenCalledWith('Testing debug')
    expect(log.info).toHaveBeenCalledWith('Testing info')
    expect(log.warn).toHaveBeenCalledWith('Testing warn')
    expect(log.error).toHaveBeenCalledWith('Testing error')
    expect(log.fatal).toHaveBeenCalledWith('Testing fatal')
    expect(log.name).toBe('ecmaos:kernel:test')
  })

  it('should log to a file', async () => {
    const kernel = new Kernel({
      log: { name: 'ecmaos:kernel:test', type: 'hidden' },
      filesystem: DefaultFilesystemOptionsTest
    })

    await kernel.filesystem.fs.writeFile('/test.log', '')
    kernel.log!.attachTransport((logObj: ILogObj) => {
      const meta = logObj._meta as IMeta
      kernel.filesystem.fsSync.appendFileSync('/test.log', `${meta.date} [${meta.logLevelName}] ${logObj[0]}`)
    })

    const data = Math.random().toString(36).substring(2, 15)
    kernel.log!.info(`Testing info ${data}`)
    const file = await kernel.filesystem.fs.readFile('/test.log', 'utf-8')
    expect(file).toContain(`Testing info ${data}`)
  })
})
