import type { Container, ContainerChild } from 'pixi.js'

interface IBaseOptions {
  minSize?: number
  gap?: number
}

interface IDistributionOptions extends IBaseOptions {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
}

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

export function flexRow (
  container: Container,
  options: IBaseOptions,
): void {

  const {
    children,
    childrenSize,
  } = getMaxDimensions(container.children)

  const N = children.length
  if (N === 0) return

  const dimension = 'width'
  const position = 'x'

  const totalSpace = Math.max(options?.minSize || 0, childrenSize[dimension])
  const leftOverSpace = (totalSpace - childrenSize[dimension]) / (N + 1)
  const gap = options?.gap ?? leftOverSpace

  let posX = 0
  children.forEach((child) => {
    child[position] = posX
    posX += child[dimension] + gap
  })
}

export function flexRowReverse (
  container: Container,
  options: IBaseOptions,
): void {

  const {
    children,
    childrenSize,
  } = getMaxDimensions(container.children)

  const N = children.length
  if (N === 0) return

  const dimension = 'width'
  const position = 'x'

  const totalSpace = Math.max(options?.minSize || 0, childrenSize[dimension])
  const leftOverSpace = (totalSpace - childrenSize[dimension]) / (N + 1)
  const gap = options?.gap ?? leftOverSpace

  children.reverse()
  let posX = totalSpace
  children.forEach((child) => {
    child[position] = posX - child[dimension]
    posX -= child[dimension] + gap
  })
}

export function flexColumn (
  container: Container,
  options: IBaseOptions,
): void {

  const {
    children,
    childrenSize,
  } = getMaxDimensions(container.children)

  const N = children.length
  if (N === 0) return

  const position = 'y'
  const dimension = 'height'

  const totalSpace = Math.max(options?.minSize || 0, childrenSize[dimension])
  const leftOverSpace = (totalSpace - childrenSize[dimension]) / (N + 1)
  const gap = options?.gap ?? leftOverSpace

  let pos = 0
  children.forEach((child) => {
    child[position] = pos
    pos += child[dimension] + gap
  })
}

export function flexColumnReverse (
  container: Container,
  options: IBaseOptions,
): void {

  const {
    children,
    childrenSize,
  } = getMaxDimensions(container.children)

  const N = children.length
  if (N === 0) return

  const dimension = 'height'
  const position = 'y'

  const totalSpace = Math.max(options?.minSize || 0, childrenSize[dimension])
  const leftOverSpace = (totalSpace - childrenSize[dimension]) / (N + 1)
  const gap = options?.gap ?? leftOverSpace

  children.reverse()
  let posX = totalSpace
  children.forEach((child) => {
    child[position] = posX - child[dimension]
    posX -= child[dimension] + gap
  })
}

type ResultGetMaxDimensions = { children: ContainerChild[], childrenSize: { width: number, height: number } }
function getMaxDimensions (children: ContainerChild[]): ResultGetMaxDimensions {

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
