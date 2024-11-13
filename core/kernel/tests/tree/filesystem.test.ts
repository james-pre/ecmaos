
import { describe, expect, it } from 'vitest'

import { DefaultFilesystemOptionsTest, Filesystem } from '#filesystem.ts'

describe('Filesystem', async () => {
  const filesystem = new Filesystem()
  await filesystem.configure(DefaultFilesystemOptionsTest)

  it('should be defined', () => {
    expect(filesystem).toBeDefined()
    expect(filesystem.fs).toBeDefined()
  })

  it('should write file', async () => {
    await filesystem.fs.writeFile('/tmp/test.txt', 'test')
    const file = await filesystem.fs.readFile('/tmp/test.txt', 'utf-8')
    expect(file).toBe('test')
  })

  it('should read file', async () => {
    const file = await filesystem.fs.readFile('/tmp/test.txt', 'utf-8')
    expect(file).toBe('test')
  })

  it('should delete file', async () => {
    await filesystem.fs.unlink('/tmp/test.txt')
    await expect(filesystem.fs.readFile('/tmp/test.txt')).rejects.toThrow()
  })

  it('should create directory', async () => {
    await filesystem.fs.mkdir('/tmp/test')
    await filesystem.fs.writeFile('/tmp/test/test.txt', 'test')
    const file = await filesystem.fs.readFile('/tmp/test/test.txt', 'utf-8')
    expect(file).toBe('test')
  })

  it('should read directory', async () => {
    const files = await filesystem.fs.readdir('/tmp/test')
    expect(files).toEqual(['test.txt'])
  })

  it('should not delete non-empty directory', async () => {
    await expect(filesystem.fs.rmdir('/tmp/test')).rejects.toThrow()

    const contents = await filesystem.fs.readdir('/tmp/test')
    for (const content of contents) await filesystem.fs.unlink(`/tmp/test/${content}`)

    await filesystem.fs.rmdir('/tmp/test')
    await expect(filesystem.fs.readdir('/tmp/test')).rejects.toThrow()
  })
})
