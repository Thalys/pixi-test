import { Sprite } from 'pixi.js'
import textures from '@/app/textures'

export class Logo extends Sprite {
  constructor () {
    super({
      texture: textures.logoPixi.normal,
      anchor: 0.5,
      scale: 0.2,
    })
  }

  public resize (width: number, height: number) {
    this.position.set(width * 0.5, height * 0.5)
  }
}
