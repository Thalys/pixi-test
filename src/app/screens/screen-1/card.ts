import { Sprite, Texture } from 'pixi.js'
import { config } from '@/app/screens/screen-1/config'

export class Card extends Sprite {

  cardOption: string = ''

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
}
