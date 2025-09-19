import type { Container } from 'pixi.js'
import type { IDistributionOptions } from '@/engine/layout.types'
import { flexColumn, flexColumnReverse, flexRow, flexRowReverse } from '@/engine/layout.flex'

/**
 * Distributes children
 * @param container - The parent container whose children will be distributed
 * @param options - Optional configuration for distribution
 */
export function flex (
  container: Container,
  options: IDistributionOptions = {},
): void {
  const { direction = 'row', ...rest } = options

  switch (direction) {
    case 'row':
      flexRow(container, rest)
      return
    case 'row-reverse':
      flexRowReverse(container, rest)
      return
    case 'column':
      flexColumn(container, rest)
      return
    case 'column-reverse':
      flexColumnReverse(container, rest)
      return
    default:
      flexRow(container, rest)
  }
}
