import { anime, createCustomAnimation } from '@/anime/anime'
import { createApp } from '@/anime/index.app'
import { createCardCharlie } from '@/anime/index.elements'
import { engine } from '@/engine/engine.singleton'
import { waitFor } from '@/lib/promise'
import { randomInt } from '@/lib/random'

(async () => {

  await createApp()

  const { screen } = engine()

  await waitFor(1)

  const card = await createCardCharlie()
  card.scale = 0.3
  card.alpha = 0

  await waitFor(1)

  const randX = randomInt(-200, screen.width + 200)
  const randY = randomInt(screen.height + 50, screen.height + 200)
  createCustomAnimation(
    { x: randX, y: randY },
    { x: card.x, y: card.y },
    { duration: 0.3, ease: 'backOut' },
  )(card).play()
  createCustomAnimation(
    {
      scale: 0.26,
    },
    {
      scale: [
        0.2 * 1.1,
        0.2 * 0.9,
      ],
    },
    { type: 'spring', stiffness: 400, damping: 10 },
  )(card).play()
  anime`fade-in duration-0.15`(card).play()


  // await anime`fade-in`(container).play()

  // await waitFor(0.3)
  // await anime`spin duration-3`(container).play()

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
})()
