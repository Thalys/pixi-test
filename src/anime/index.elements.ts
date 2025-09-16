import { Assets, Container, Graphics, Sprite, Text, Texture } from 'pixi.js'
import { engine } from '@/engine/engine.singleton'

const _createBunnies = (tBunny: Texture, container: Container, bunnies: Sprite[]) => {
  Array.from(
    { length: 25 },
    (_v, i) => {
      const bunny = new Sprite(tBunny)

      bunny.x = (i % 5) * 40
      bunny.y = Math.floor(i / 5) * 40
      container.addChild(bunny)
      return bunny
    },
    bunnies,
  )
}

export async function createBunniesContainer () {
  const { stage, screen } = engine()
  const container = new Container()
  stage.addChild(container)

  // bunny texture
  const tBunny = Texture.from('bunny.png')

  // Create a 5x5 grid of bunnies in the container
  const bunnies: Sprite[] = []
  _createBunnies(tBunny, container, bunnies)

  // Move the container to the center
  container.x = screen.width * 0.5
  container.y = screen.height * 0.5

  // Center the bunny sprites in local container coordinates
  container.pivot.x = container.width * 0.5
  container.pivot.y = container.height * 0.5

  return { container, bunnies }
}

export function createCircle () {
  const app = engine()
  const circle = new Graphics()
  circle.circle(0, 0, 30)
  circle.fill(0x4ECDC4)
  circle.x = 350
  circle.y = 150
  app.stage.addChild(circle)
  return circle
}

export function createRectangle () {
  const app = engine()
  const rect = new Graphics()
  rect.rect(-25, -25, 50, 50)
  rect.fill(0xFFE66D)
  rect.x = 300
  rect.y = 150
  app.stage.addChild(rect)
  return rect
}

export function createLabel () {
  const app = engine()
  const label = new Text({
    text: 'Hello anime!',
    style: { fontSize: 24, fill: 0xFFFFFF },
  })
  label.x = 400
  label.y = 300
  app.stage.addChild(label)
  return label
}

export function createCounterLabel () {
  const app = engine()
  const labelCounter = new Text({
    text: '0',
    style: { fontSize: 24, fill: 0xFFFFFF },
  })
  labelCounter.x = 800
  labelCounter.y = 200
  app.stage.addChild(labelCounter)
  return labelCounter
}

export function createSquaresContainer () {
  const app = engine()
  const containerSquares = new Container()
  // Create multiple objects for stagger demo
  const squares: Graphics[] = []
  for (let i = 0; i < 5; i++) {
    const square = new Graphics()
    square.rect(-15, -15, 30, 30)
    square.fill(0xF38BA8)
    square.x = 100 + i * 60
    square.y = 400
    squares.push(square)
    containerSquares.addChild(square)
  }

  app.stage.addChild(containerSquares)
  return { containerSquares, squares }
}

export async function createElements () {
  const { container, bunnies } = await createBunniesContainer()
  const circle = createCircle()
  const rect = createRectangle()
  const label = createLabel()
  const labelCounter = createCounterLabel()
  const { containerSquares, squares } = createSquaresContainer()

  return { container, containerSquares, bunnies, circle, rect, label, squares, labelCounter }
}
