import { Sprite, Texture } from 'pixi.js'

export class CardBack extends Sprite {

  constructor () {
    super({ texture: Texture.from('card-back.png'), anchor: 0.5 })
  }
}
