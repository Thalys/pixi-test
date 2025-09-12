import type { FederatedPointerEvent } from 'pixi.js'
import { Container, Sprite, Texture } from 'pixi.js'

export class Logo extends Container {

  private bg: Sprite
  private fg: Sprite
  onPointerUpOutside = (event: FederatedPointerEvent) => {
    this.fg.alpha = 0
  }

  onPointerOver = (event: FederatedPointerEvent) => {
    this.fg.alpha = 1
  }

  onPointerOut = (event: FederatedPointerEvent) => {
    this.fg.alpha = 0
  }

  constructor () {
    super()

    this.bg = Sprite.from(Texture.from('logo.svg'))
    this.bg.anchor = 0.5
    this.bg.scale = 0.2
    this.addChild(this.bg)

    this.fg = Sprite.from(Texture.from('logo-white.svg'))
    this.fg.anchor = 0.5
    this.fg.scale = 0.2
    this.fg.alpha = 0
    this.addChild(this.fg)

    this.fg.eventMode = 'static'
    this.fg.cursor = 'pointer'
    this.fg
      // .on('pointerdown', this.onPointerDown)
      // .on('pointerup', this.onPointerUp)
      .on('pointerupoutside', this.onPointerUpOutside)
      .on('pointerover', this.onPointerOver)
      .on('pointerout', this.onPointerOut)
  }
}
