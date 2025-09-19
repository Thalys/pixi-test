import type { Ticker } from 'pixi.js'
import type { AppScreens, IAppScreen } from '@/engine/navigation.types'
import { FancyButton } from '@pixi/ui'
import { Container } from 'pixi.js'
import { anime } from '@/anime/anime'
import { PopupPause } from '@/app/popups/popup.pause'
import { PopupSettings } from '@/app/popups/popup.settings'
import { engine } from '@/engine/engine.singleton'

export class ScreenBaseUI extends Container implements IAppScreen {
  public definition: AppScreens = 'ScreenMain'
  public override label: string = '☠️ ScreenBaseUI'
  public static assetBundles = ['main']
  protected btnPause: FancyButton
  protected btnSettings: FancyButton
  protected paused = false

  constructor () {
    super()

    const buttonAnimations = {
      hover: {
        props: { scale: { x: 1.1, y: 1.1 } },
        duration: 100,
      },
      pressed: {
        props: { scale: { x: 0.9, y: 0.9 } },
        duration: 100,
      },
    }

    const goToPausePopup = () => { void engine().navigation.presentPopup(PopupPause) }
    this.btnPause = new FancyButton({
      defaultView: 'icon-pause.png',
      anchor: 0.5,
      animations: buttonAnimations,
    })
    this.btnPause.label = 'btnPause'
    this.btnPause.onPress.connect(goToPausePopup)
    this.addChild(this.btnPause)

    const goToSettings = () => { void engine().navigation.presentPopup(PopupSettings) }
    this.btnSettings = new FancyButton({
      defaultView: 'icon-settings.png',
      anchor: 0.5,
      animations: buttonAnimations,
    })
    this.btnSettings.label = 'btnSettings'
    this.btnSettings.onPress.connect(goToSettings)
    this.addChild(this.btnSettings)
  }

  public prepare () {}

  public update (time: Ticker) {}

  public async pause () {
    this.paused = true
  }

  public async resume () {
    this.paused = false
  }

  public reset () {}

  public resize (width: number, height: number) {
    this.btnPause.x = 30
    this.btnPause.y = 30
    this.btnSettings.x = width - 30
    this.btnSettings.y = 30
  }

  public async show (): Promise<void> {
    this.btnPause.alpha = 0
    this.btnSettings.alpha = 0
    const promises = [
      anime`fade-in`(this.btnPause).play(),
      anime`fade-in`(this.btnSettings).play(),
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
