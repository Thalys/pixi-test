import { Sprite, Texture } from 'pixi.js'
import { anime, createCustomAnimation } from '@/anime/anime'
import { config } from '@/app/screens/screen-1/config'
import textures from '@/app/textures'
import { engine } from '@/engine/engine.singleton'
import { randomInt } from '@/lib/random'

export class Card extends Sprite {

  public cardOption: string = ''

  constructor () {
    const rndIndex = Math.floor(textures.cardOptions.length * Math.random())
    super({
      texture: Texture.from(textures.cardOptions[rndIndex]),
      anchor: 0.5,
      scale: 0.15,
      label: 'Card',
    })
    this.cardOption = textures.cardOptions[rndIndex]
    this.label = `Card-${textures.cardOptions[rndIndex]}`
  }

  public visualWidth = () => {
    return config.cards.properties.width * this.scale.x
  }

  public visualHeight = () => {
    return config.cards.properties.height * this.scale.y
  }

  public async animEntry (delay: number) {
    const { screen } = engine()

    const randX = randomInt(0, screen.width)
    const randY = randomInt(screen.height + 50, screen.height + 200)

    const promises = Promise.all([
      createCustomAnimation(
        { x: randX, y: randY },
        { x: this.x, y: this.y },
        { delay, duration: 0.3, ease: 'backOut' },
      )(this).play(),

      createCustomAnimation(
        { scale: 0.26 },
        { scale: [0.2 * 1.1, 0.2 * 0.9] },
        { delay, type: 'spring' },
      )(this).play(),

      anime`fade-in duration-0.15`(this, { delay }).play(),
    ])
    return promises
  }

  public animSlide (x: number, y: number, duration: number = 2, delay: number = 0) {
    const anim = createCustomAnimation(
      { x: this.x, y: this.y },
      { x, y },
      { delay, duration, ease: 'circOut' },
    )
    return anim(this)
  }
}
