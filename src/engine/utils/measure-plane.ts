import { Container, Graphics } from 'pixi.js'
import { engine } from '@/app/engine-singleton'

export class Measure extends Container {

  public override label = 'Measure'

  private grid: Graphics = new Graphics()

  constructor () {
    super()
    const { screen, stage } = engine()
    this.buildGrid(screen.width, screen.height)
    this.addChild(this.grid)

    // Center the container on screen
    stage.addChild(this)

    this.x = 0
    this.y = 0
    this.alpha = 0.5
  }

  /**
   * Creates a grid pattern using Graphics lines
   */
  buildGrid (w: number, h: number) {

    for (let i = 0; i <= w; i += 20) {
      // vertical
      this.grid.moveTo(i, 0).lineTo(i, h)
    }

    for (let i = 0; i <= h; i += 20) {
      // horizontal
      this.grid.moveTo(0, i).lineTo(w, i)
    }

    this.grid.stroke({ color: 0xFFFFFF, pixelLine: false })
  }
}
