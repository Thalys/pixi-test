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
  container.x = app.screen.width / 2
  container.y = app.screen.height / 2

  // Center the bunny sprites in local container coordinates
  container.pivot.x = container.width / 2
  container.pivot.y = container.height / 2

  return { container, bunnies }
}

(async () => {

  await createApp()

  const { container, bunnies } = await createElements()

  await waitFor(1)
  await anime`fade-in duration-1000`(container).play()

  await waitFor(1)
  await anime`wobble`(container).play()

  await waitFor(1)
  await anime`spin duration-2000`(container).play()
})()

// Demo function showing various animation patterns
async function runAnimationDemo () {
  const app = engine()
  // Create some PixiJS objects to animate
  const container = new Container()
  app.stage.addChild(container)

  // Create a sprite (assuming you have a texture)
  const sprite = new Sprite() // You'd load a texture here
  sprite.x = 100
  sprite.y = 100
  sprite.tint = 0xFF6B6B
  container.addChild(sprite)

  // Create some graphics objects
  const circle = new Graphics()
  circle.circle(0, 0, 30)
  circle.fill(0x4ECDC4)
  circle.x = 200
  circle.y = 200
  container.addChild(circle)

  const rect = new Graphics()
  rect.rect(-25, -25, 50, 50)
  rect.fill(0xFFE66D)
  rect.x = 300
  rect.y = 150
  container.addChild(rect)

  // Create text
  const label = new Text({
    text: 'Hello PixiJS!',
    style: { fontSize: 24, fill: 0xFFFFFF },
  })
  label.x = 400
  label.y = 300
  container.addChild(label)

  // Create multiple objects for stagger demo
  const squares: Graphics[] = []
  for (let i = 0; i < 5; i++) {
    const square = new Graphics()
    square.rect(-15, -15, 30, 30)
    square.fill(0xF38BA8)
    square.x = 100 + i * 60
    square.y = 400
    squares.push(square)
    container.addChild(square)
  }

  // Demo 1: Basic fade-in animation using tagged template
  logger.log('Demo 1: Fade in animation')
  await anime`fade-in duration-1000`(sprite).play()

  // Demo 2: Scale bounce with spring physics
  logger.log('Demo 2: Scale bounce')
  await anime`scale-bounce`(circle).play()

  // Demo 3: Slide animation with custom easing
  logger.log('Demo 3: Slide up with easing')
  await anime`slide-up ease-backOut duration-800`(rect).play()

  // Demo 4: Staggered animation on multiple objects
  logger.log('Demo 4: Staggered scale-in')
  await anime`scale-in stagger-150 duration-600`(squares).play()

  // Demo 5: Using convenience functions
  logger.log('Demo 5: Text bounce using convenience function')
  animations.bounce(label, { duration: 0.8 }).play()

  // Demo 6: Custom animation with number interpolation (like your label.text example)
  logger.log('Demo 6: Number counter animation')
  const counter = { value: 0 }
  const counterAnim = createCustomAnimation(
    { value: 0 },
    { value: 100 },
    {
      duration: 2,
      ease: 'circOut',
      onUpdate: (progress: number) => {
        const current = Math.round(counter.value)
        label.text = `Count: ${current}`
      },
    },
  )
  await counterAnim(counter).play()

  // Demo 7: Complex sequenced animations
  logger.log('Demo 7: Complex sequence')
  await anime`zoom-out`(rect).play()
  await anime`spin duration-1000`(rect).play()
  await anime`zoom-in`(rect).play()

  // Demo 8: Parallel animations
  logger.log('Demo 8: Parallel animations')
  const parallelAnimations = [
    anime`shake-x`(sprite).play(),
    anime`scale-pulse`(circle).play(),
    anime`wobble`(rect).play(),
  ]
  await Promise.all(parallelAnimations)

  // Demo 9: Animation with controls
  logger.log('Demo 9: Animation controls')
  const spinAnimation = anime`spin-slow`(circle)
  spinAnimation.play()

  // Pause after 2 seconds
  setTimeout(() => {
    logger.log('Pausing spin...')
    spinAnimation.pause()
  }, 2000)

  // Resume after 4 seconds
  setTimeout(() => {
    logger.log('Resuming spin...')
    spinAnimation.play()
  }, 4000)

  // Stop after 6 seconds
  setTimeout(() => {
    logger.log('Stopping spin...')
    spinAnimation.stop()
  }, 6000)

  // Demo 10: Chained animations with different targets
  logger.log('Demo 10: Chained sequence across objects')
  await anime`fade-out duration-500`(squares).play()
  await anime`slide-in-right stagger-100`(squares).play()
  await anime`bounce stagger-80`(squares).play()

  logger.log('Animation demo complete!')
}

// Example of how you might integrate this with your existing patterns
class AnimatedSprite extends Sprite {
  // Add animation methods directly to your sprite classes
  async fadeIn (duration = 300) {
    return anim`fade-in duration-${duration}`(this).play()
  }

  async scaleBounceTo (scale: number) {
    const customBounce = createCustomAnimation(
      { scale: this.scale.x },
      { scale },
      { type: 'spring', stiffness: 300, damping: 15 },
    )
    return customBounce(this).play()
  }

  async shakeError () {
    return anim`shake-x duration-400`(this).play()
  }
}

// Example usage matching your current patterns
async function gameAnimationExamples () {
  const container = new Container()
  const bunny = new AnimatedSprite()
  const bunnies = [new Sprite(), new Sprite(), new Sprite()]

  // Your original patterns:
  // await animate(container, { scale: 1 }, { ease: 'circInOut', duration: 1 })
  // Now becomes:
  await anim`scale-in ease-circInOut duration-1000`(container).play()

  // await animate(bunny, { rotation: 90 * DEG_TO_RAD }, { type: 'spring', repeat: Infinity, repeatDelay: 0.2 })
  // Now becomes:
  const DEG_TO_RAD = Math.PI / 180
  const spinAnim = createCustomAnimation(
    { rotation: bunny.rotation },
    { rotation: 90 * DEG_TO_RAD },
    { type: 'spring', repeat: Infinity, repeatDelay: 0.2 },
  )
  spinAnim(bunny).play() // Non-blocking

  // await animate(bunnies, { alpha: 1, y: [50, 0] }, { delay: stagger(0.05) })
  // Now becomes:
  await anim`fade-in-up stagger-50`(bunnies).play()

  // The number animation example would work the same way as Demo 6 above
}

export { AnimatedSprite, gameAnimationExamples, runAnimationDemo }
