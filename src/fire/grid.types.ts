import type { DSprite } from '@/engine/scene/sprite.DOOM'

export type TGridTraversalInfo = { cell: DSprite, col: number, row: number }
export type TFNTraverseReturn = (info: TGridTraversalInfo, i: number) => void
