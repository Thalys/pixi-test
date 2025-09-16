import type { FederatedPointerEvent } from 'pixi.js'
import { animate } from 'motion'
import { Container, Sprite, Texture } from 'pixi.js'

const fadeIn = async (element: Container) => {
  await animate(
    element,
    { alpha: 1 },
    { duration: 0.5, ease: 'circOut' },
  )
}
const fadeOut = async (element: Container) => {
  animate(
    element,
    { alpha: 0 },
    { duration: 0.5, ease: 'backOut' },
  )
}

const goToPixiWebsite = () => {
  window.open('https://pixijs.com', '_blank')
}

export class Logo extends Container {

  private bg: Sprite
  private fg: Sprite

  onPointerOver = (event: FederatedPointerEvent) => {
    fadeIn(this.fg)
  }

  onPointerOut = (event: FederatedPointerEvent) => {
    fadeOut(this.fg)
  }

  constructor () {
    super()

    this.interactive = true
    this.cursor = 'pointer'

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
      .on('pointerdown', goToPixiWebsite)
      .on('pointerover', this.onPointerOver)
      .on('pointerupoutside', this.onPointerOut)
      .on('pointerout', this.onPointerOut)
  }
}
