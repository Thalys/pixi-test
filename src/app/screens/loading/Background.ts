import { Container, Graphics } from 'pixi.js'
import { engine } from '@/engine/engine.singleton'

export class Background extends Container {
  constructor () {
    super()

    this.config()
    this.drawSquare()
  }

  private config () {
    this.pivot.set(0.5)
  }

  private drawSquare () {
    const { screen } = engine()
    const { width, height } = screen
    const color = '#1E1E1E'

    const draw = new Graphics()
    draw.rect(0, 0, width, height)
    draw.fill(color)
    this.addChild(draw)
  }
}
