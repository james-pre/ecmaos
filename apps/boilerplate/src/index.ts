#!ecmaos:bin:app:boilerplate

import type { ProcessEntryParams } from '@ecmaos/types'

const main = async (params: ProcessEntryParams) => {
  console.log('Boilerplate App:', params)
  const { args, command, cwd, gid, kernel, pid, shell, terminal, stdin, stdout, stderr, uid } = params
  terminal.writeln(`Hello, ${kernel.name} ${kernel.id}!`)
  terminal.writeln(`CWD: ${shell.cwd}`)
  terminal.writeln(`ARGS: ${args.join(' ')}`)
}

export default main
