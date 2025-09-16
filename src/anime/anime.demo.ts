import { Assets, Container, Graphics, Sprite, Text } from 'pixi.js'
import { CreationEngine } from '@/engine/engine'
import { engine, setEngine } from '@/engine/engine.singleton'
import { Measure } from '@/engine/utils/stage-ruler'
import { waitFor } from '@/engine/utils/waitFor'
import { logger } from '@/tools/logger'
import { animations, anime, createCustomAnimation } from './anime'

async function createApp () {
  const engine = new CreationEngine()
  setEngine(engine)

  logger.table(JSON.parse(JSON.stringify(import.meta.env)))
  logger.info(JSON.parse(JSON.stringify(`App version: \n${window.__PIXI_TEST_VERSION__}`)))

  // Initialize the creation engine instance
  await engine.init({
    background: '#1099bb',
    resizeOptions: { minWidth: 600, minHeight: 600, letterbox: false },
  })

  if (import.meta.env.DEV) {
    engine.navigation.setMeasureLayer(Measure)
  }

  return engine
}

async function createElements () {
  const app = engine()
  const container = new Container()
  app.stage.addChild(container)
  const texture = await Assets.load('https://pixijs.com/assets/bunny.png')

  const bunnies: Sprite[] = []
  // Create a 5x5 grid of bunnies in the container
  for (let i = 0; i < 25; i++) {
    const bunny = new Sprite(texture)
    bunnies.push(bunny)

    bunny.x = (i % 5) * 40
    bunny.y = Math.floor(i / 5) * 40
    container.addChild(bunny)
  }

  container.alpha = 0

  // Move the container to the center
  container.x = 150
  container.y = 150

  // Center the bunny sprites in local container coordinates
  container.pivot.x = container.width / 2
  container.pivot.y = container.height / 2

  const circle = new Graphics()
  circle.circle(0, 0, 30)
  circle.fill(0x4ECDC4)
  circle.x = 350
  circle.y = 150
  app.stage.addChild(circle)

  const rect = new Graphics()
  rect.rect(-25, -25, 50, 50)
  rect.fill(0xFFE66D)
  rect.x = 300
  rect.y = 150
  app.stage.addChild(rect)

  // Create text
  const label = new Text({
    text: 'Hello PixiJS!',
    style: { fontSize: 24, fill: 0xFFFFFF },
  })
  label.x = 400
  label.y = 300
  app.stage.addChild(label)

  // Create text
  const labelCounter = new Text({
    text: '0',
    style: { fontSize: 24, fill: 0xFFFFFF },
  })
  labelCounter.x = 800
  labelCounter.y = 200
  app.stage.addChild(labelCounter)

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

  return { container, containerSquares, bunnies, circle, rect, label, squares, labelCounter }
}

(async () => {

  await createApp()

  const { container } = await createElements()

  await waitFor(0.5)
  await anime`fade-in`(container).play()

  // bunnies[0].alpha = 0
  // anime`fade-in repeat-1000`(bunnies[0]).play()

  // bunnies[1].alpha = 1
  // anime`fade-out repeat-1000`(bunnies[1]).play()

  // anime`scale-bounce`(circle).play()

  // anime`slide-up ease-backOut duration-800`(rect).play()
  // anime`scale-in stagger-150 duration-600`(squares).play()
  // animations.bounce(label, { duration: 0.8 }).play()

  // const counter = { value: 0 }
  // const counterAnim = createCustomAnimation(
  //   { value: 0 },
  //   { value: 100 },
  //   {
  //     duration: 2,
  //     repeat: 1000,
  //     ease: 'circOut',
  //     onUpdate: (progress: number) => {
  //       const current = Math.round(counter.value)
  //       labelCounter.text = `Count: ${current}`
  //     },
  //   },
  // )
  // await counterAnim(counter).play()

  await waitFor(0.3)
  await anime`spin duration-3`(container).play()
})()
