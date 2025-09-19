import { anime } from '@/anime/anime'
import { createApp } from '@/anime/index.app'
import { createBunniesContainer } from '@/anime/index.elements'
import { waitFor } from '@/engine/utils/waitFor'

(async () => {

  await createApp()

  const { container } = await createBunniesContainer()

  container.alpha = 0

  await waitFor(0.5)
  await anime`fade-in`(container).play()

  await waitFor(0.3)
  await anime`spin duration-3`(container).play()

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
