import type { Container, ContainerChild } from 'pixi.js'

interface DistributionOptions {
  direction?: 'horizontal' | 'vertical'
  alignCenter?: boolean
  padding?: {
    x?: number
    y?: number
    width?: number
    height?: number
  }
}

/**
 * Distributes children evenly within a parent container
 * @param container - The parent container whose children will be distributed
 * @param options - Optional configuration for distribution
 */
export function distributeEvenly (
  container: Container,
  options: DistributionOptions = {},
): void {
  const {
    direction = 'horizontal',
    alignCenter = false,
    padding = { x: 0, y: 0, width: 0, height: 0 },
  } = options

  const _padding = {
    x: padding.x ?? 0,
    y: padding.y ?? 0,
    width: padding.width ?? 0,
    height: padding.height ?? 0,
  }

  const {
    children,

    // accumulated size of all children
    childrenSize,
  } = getMaxDimensions(container.children)

  const N = children.length

  if (N === 0) return

  // Calculate available width or height based on direction
  const isHorizontal = direction === 'horizontal'
  const dimension = isHorizontal ? 'width' : 'height'
  const position = isHorizontal ? 'x' : 'y'
  const crossPosition = isHorizontal ? 'y' : 'x'

  // Get container dimensions
  const totalSpace = childrenSize[dimension] + _padding[position] + _padding[dimension]

  // Calculate gap between elements
  const gap = (totalSpace - childrenSize[dimension]) / (N + 1)

  // Position each child
  let currentPosition = _padding[position] + gap

  children.forEach((child) => {
    const childSize = child[dimension] || 0

    // Set main axis position
    child[position] = currentPosition

    // Center on cross axis if requested
    if (alignCenter) {
      const crossDimension = isHorizontal ? 'height' : 'width'
      const containerCrossSize = container.getSize()[crossDimension]
      const childCrossSize = child[crossDimension] || 0
      child[crossPosition] = (containerCrossSize - childCrossSize) / 2
    }

    // Update position for next child
    currentPosition += childSize + gap
  })
}

/**
 * Creates a grid layout of children
 * @param container - The parent container
 * @param columns - Number of columns in the grid
 * @param spacing - Spacing between grid items
 */
export function distributeGrid (
  container: Container,
  columns: number,
  spacing: number = 10,
): void {
  const children = container.children.filter(child => child.visible)

  if (children.length === 0) return

  // Calculate max dimensions for uniform sizing
  let maxWidth = 0
  let maxHeight = 0

  children.forEach((child) => {
    maxWidth = Math.max(maxWidth, child.width || 0)
    maxHeight = Math.max(maxHeight, child.height || 0)
  })

  // Position children in grid
  children.forEach((child, index) => {
    const col = index % columns
    const row = Math.floor(index / columns)

    child.x = col * (maxWidth + spacing)
    child.y = row * (maxHeight + spacing)
  })
}

type ResultGetMaxDimensions = { children: ContainerChild[], childrenSize: { width: number, height: number } }
function getMaxDimensions (
  children: ContainerChild[],
): ResultGetMaxDimensions {
  return children
    .filter(child => child.visible)
    .reduce((acc, child) => {

      acc.children.push(child)
      const { width, height } = child.getSize()
      acc.childrenSize.width += width
      acc.childrenSize.height += height
      return acc
    }, { children: [], childrenSize: { width: 0, height: 0 } } as ResultGetMaxDimensions)
}
