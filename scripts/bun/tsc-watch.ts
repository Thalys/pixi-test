import { $ } from 'bun'


await Promise.all([
  $`bunx --bun tsc --noEmit -p ./tsconfig.app.json --watch`,
  $`bunx --bun tsc --noEmit -p ./tsconfig.node.json --watch`,
])
