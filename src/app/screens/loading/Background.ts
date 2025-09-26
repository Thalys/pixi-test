import { Color, Container, Sprite, Texture } from 'pixi.js'
import { ZINC } from '@/app/utils/colors'
import { engine } from '@/engine/engine.singleton'

export class Background extends Container {

  private bg: Sprite
  constructor () {
    super()

    const color = new Color(ZINC[900]).toNumber()

    const { screen } = engine()
    const { width, height } = screen

    this.bg = new Sprite(Texture.WHITE)
    this.addChild(this.bg)
    this.bg.tint = color
    this.bg.position.set(0)
    this.bg.setSize(width, height)
  }

  public resize (width: number, height: number) {
    this.bg.position.set(0)
    this.bg.setSize(width, height)
  }
}
