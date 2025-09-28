import type { FancyButton } from '@pixi/ui'
import type { Ticker } from 'pixi.js'
import type { AppScreens, IAppScreen, TAssetBundleId } from '@/engine/navigation.types'
import { Container } from 'pixi.js'
import { anime } from '@/anime/anime'
import buttons from '@/app/buttons'
import { PopupPause } from '@/app/popups/popup.pause'
import { engine } from '@/engine/engine.singleton'

export class OverlayUI extends Container implements IAppScreen {
  public definition: AppScreens = 'OverlayUI'
  public override label: string = 'OverlayUI'
  public static assetBundles: TAssetBundleId[] = ['preload'] as TAssetBundleId[]
  protected btnPause: FancyButton
  protected btnHome: FancyButton
  protected btnSettings: FancyButton
  protected btnFullScreen: FancyButton
  protected paused = false

  constructor () {
    super()

    this.btnPause = buttons.createBtnPause
    this.addChild(this.btnPause)

    this.btnHome = buttons.createBtnHome
    this.addChild(this.btnHome)

    this.btnSettings = buttons.createBtnSettings
    this.addChild(this.btnSettings)

    this.btnFullScreen = buttons.createBtnFullScreen
    this.addChild(this.btnFullScreen)
  }

  public prepare () {}

  public update (time: Ticker) {}

  public async pause () { this.paused = true }

  public async resume () { this.paused = false }

  public reset () {}

  public resize (width: number, height: number) {
    this.btnPause.x = 30
    this.btnPause.y = 30
    this.btnHome.x = this.btnPause.getBounds().right + 20
    this.btnHome.y = 30

    this.btnSettings.x = width - 30
    this.btnSettings.y = 30
    this.btnFullScreen.x = this.btnSettings.getBounds().left - 20
    this.btnFullScreen.y = 30
  }

  public async show (): Promise<void> {
    this.btnPause.alpha = 0
    this.btnSettings.alpha = 0
    this.btnHome.alpha = 0

    const promises = [
      anime`fade-in`(this.btnPause).play(),
      anime`fade-in`(this.btnSettings).play(),
      anime`fade-in`(this.btnHome).play(),
    ]
    await Promise.all(promises)
  }

  public async hide () {}

  public blur () {
    if (!engine().navigation.currentPopup) {
      engine().navigation.presentPopup(PopupPause)
    }
  }
}
