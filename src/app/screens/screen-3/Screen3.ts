import type { AppScreens } from '@/engine/navigation.types'
import { Container, Rectangle } from 'pixi.js'
import { ScreenBaseUI } from '@/app/screens/ScreenBaseUI'
import { CometSystem } from './comets'

/**
 * "Phoenix Flame"
 *
 * Make a particle-effect demo showing a great fire effect. Keep the number of
 * images at max 10 sprites on the screen at the same time.
 */
export class Screen3 extends ScreenBaseUI {
  public override definition: AppScreens = 'Screen3'
  public override label: string = 'Screen3'
  public static override assetBundles = ['main', 'fire']

  private cometSystem: CometSystem
  private mContainer: Container

  constructor () {
    super()
    this.setupGameplay()
  }

  private setupGameplay (): void {
    this.mContainer = new Container()
    this.mContainer.label = 'GameplayContainer'
    this.addChild(this.mContainer)

    this.cometSystem = new CometSystem({
      animationSpeed: 0.25,
      movementSpeed: 1.2,
    })

    this.mContainer.addChild(this.cometSystem)
  }

  public override prepare (): void {
    this.cometSystem.initialize()
  }

  public override reset (): void {
    this.cometSystem.stop()
    this.cometSystem.clear()
  }

  public override resize (width: number, height: number): void {
    super.resize(width, height)

    const padding = 60
    const bounds = new Rectangle(
      padding,
      padding,
      width - padding * 2,
      height - padding * 2,
    )

    this.cometSystem.updateBounds(bounds)

    this.mContainer.x = 0
    this.mContainer.y = 0
  }

  public override async show (): Promise<void> {
    await super.show()
    this.cometSystem.start()
  }

  public override async hide (): Promise<void> {
    this.cometSystem.stop()
    await super.hide()
  }

  public override async pause (): Promise<void> {
    await super.pause()
    this.cometSystem.stop()
  }

  public override async resume (): Promise<void> {
    await super.resume()
    if (!this.paused) {
      this.cometSystem.start()
    }
  }
}
