import type { FederatedPointerEvent } from 'pixi.js'
import { Container, Sprite } from 'pixi.js'
import { anime } from '@/anime/anime'
import textures from '@/app/textures'

const goToPixiWebsite = () => {
  window.open('https://pixijs.com', '_blank')
}

export class PixiLogo extends Container {

  private bg: Sprite
  private fg: Sprite

  onPointerOver = (event: FederatedPointerEvent) => {
    anime`fade-in duration-0.3`(this.fg).play()
  }

  onPointerOut = (event: FederatedPointerEvent) => {
    anime`fade-out`(this.fg).play()
  }

  constructor () {
    super()

    this.cursor = 'pointer'

    this.bg = Sprite.from(textures.logoPixi.normal)
    this.bg.anchor = 0.5
    this.bg.scale = 0.2
    this.addChild(this.bg)

    this.fg = Sprite.from(textures.logoPixi.white)
    this.fg.anchor = 0.5
    this.fg.scale = 0.2
    this.fg.alpha = 0
    this.addChild(this.fg)

    this.fg.eventMode = 'static'
    this.fg.cursor = 'pointer'
    this.fg
      .on('pointerdown', goToPixiWebsite)
      .on('pointerover', this.onPointerOver)
      .on('pointerupoutside', this.onPointerOut)
      .on('pointerout', this.onPointerOut)
  }
}
