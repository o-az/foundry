import * as ChildProcess from 'node:child_process'
import type { ForgeCommand } from '#forge/types.ts'
let _:ForgeCommand['command']
export async function forgeCommand({
  cwd,
  command,
}: {
  cwd?: string
  command: ForgeCommand
}): Promise<string> {
  const { command, args } = command
  return new Promise((resolve, reject) => {
    const forgeProcess = ChildProcess.spawn('forge', [command, ...args], {
      cwd,
    })
    let [output, error] = ['', '']

    forgeProcess.stdout.on('data', (data) => (output += data))
    forgeProcess.stderr.on('data', (data) => (error += data))

    forgeProcess.on('close', (code) => {
      if (code === 0) resolve(output)
      else reject(new Error(`Forge failed with code ${code}: ${error}`))
    })
  })
}
