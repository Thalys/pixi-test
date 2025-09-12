import { Sprite, Texture } from 'pixi.js'

export class CardBack extends Sprite {

  public readonly config = {
    width: 672,
    height: 960,
  }

  constructor () {
    super({
      texture: Texture.from('card-back.png'),
      anchor: 0.5,
      scale: 0.15,
      label: 'CardBack',
    })
  }

  public visualWidth = () => {
    return this.config.width * this.scale.x
  }

  public visualHeight = () => {
    return this.config.height * this.scale.y
  }
}
