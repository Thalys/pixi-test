import { Sprite, Texture } from 'pixi.js'
import { createCustomAnimation } from '@/anime/anime'
import { config } from '@/app/screens/screen-1/config'

export class Card extends Sprite {

  public cardOption: string = ''

  constructor () {
    const rndIndex = Math.floor(config.cards.options.length * Math.random())
    super({
      texture: Texture.from(config.cards.options[rndIndex]),
      anchor: 0.5,
      scale: 0.15,
      label: 'Card',
    })
    this.cardOption = config.cards.options[rndIndex]
  }

  public visualWidth = () => {
    return config.cards.properties.width * this.scale.x
  }

  public visualHeight = () => {
    return config.cards.properties.height * this.scale.y
  }

  public animFadeInUp (delay: number = 0) {
    const anim = createCustomAnimation(
      { alpha: 0, y: this.y + 20 },
      { alpha: 1, y: this.y },
      { delay, duration: 0.5, ease: 'circIn' },
    )
    return anim(this)
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
