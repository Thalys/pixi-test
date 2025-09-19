import type { DSprite } from '@/engine/scene/sprite.DOOM'
import type { TFNTraverseReturn } from '@/fire/grid.types'

const { floor } = Math

export function traverseGrid (opts: { width: number, height: number }) {
  return function (cells: DSprite[], fn: TFNTraverseReturn, startOffset?: number) {
    const width = Math.ceil(opts.width)
    const height = Math.ceil(opts.height)

    const size = width * height
    const cols = width

    for (let i = startOffset ?? 0; i < size; i++) {
      const cell = cells[i]
      const col = i % cols
      const row = floor(i / cols)
      fn({ cell, col, row }, i)
    }
  }
}
