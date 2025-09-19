import { $ } from 'bun'

await Promise.all([
  $`bunx --bun tsc --noEmit -p ./tsconfig.app.json`,
  $`bunx --bun tsc --noEmit -p ./tsconfig.node.json`,
])
