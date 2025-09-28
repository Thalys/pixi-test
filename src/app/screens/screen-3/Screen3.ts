import type { AppScreens, IAppScreen, TAssetBundleId } from '@/engine/navigation.types'
import { Container, Rectangle } from 'pixi.js'
import { PopupPause } from '@/app/popups/popup.pause'
import { engine } from '@/engine/engine.singleton'
import { CometSystem } from './comets'

/**
 * "Phoenix Flame"
 *
 * Make a particle-effect demo showing a great fire effect. Keep the number of
 * images at max 10 sprites on the screen at the same time.
 */
export class Screen3 extends Container implements IAppScreen {
  public definition: AppScreens = 'Screen3'
  public override label: string = 'Screen3'
  public static assetBundles = ['main', 'fire'] as TAssetBundleId[]

  private cometSystem: CometSystem
  private mContainer: Container
  private paused = false

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

  public prepare (): void {
    this.cometSystem.initialize()
  }

  public reset (): void {
    this.cometSystem.stop()
    this.cometSystem.clear()
  }

  public resize (width: number, height: number): void {

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

  public async show (): Promise<void> {
    this.cometSystem.start()
  }

  public async hide (): Promise<void> {
    this.cometSystem.stop()
  }

  public async pause (): Promise<void> {
    this.cometSystem.stop()
  }

  public async resume (): Promise<void> {
    if (!this.paused) {
      this.cometSystem.start()
    }
  }

  public blur () {
    if (!engine().navigation.currentPopup) {
      engine().navigation.presentPopup(PopupPause)
    }
  }
}
