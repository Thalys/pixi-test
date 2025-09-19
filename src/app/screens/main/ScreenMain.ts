import type { AppScreens } from '@/engine/navigation.types'
import { Container } from 'pixi.js'
import { anime } from '@/anime/anime'
import { config } from '@/app/screens/main/config'
import { Logo } from '@/app/screens/main/Logo'
import { ScreenBaseUI } from '@/app/screens/ScreenBaseUI'
import { Button } from '@/app/ui/Button'
import { engine } from '@/engine/engine.singleton'

/** The screen that holds the app */
export class ScreenMain extends ScreenBaseUI {
  public override definition: AppScreens = 'ScreenMain'
  /** Assets bundles required by this screen */
  public static override assetBundles = ['main']
  public mainContainer: Container
  private buttons: Button[]
  private logo: Logo

  constructor () {
    super()

    this.mainContainer = new Container()
    this.addChild(this.mainContainer)

    this.buttons = config.map(({ text, width, height, screen }) => {
      const btn = new Button({ text, width, height })
      btn.onPress.connect(() => { void engine().navigation.showScreen(screen) })
      this.addChild(btn)
      return btn
    })

    this.logo = new Logo()
    this.addChild(this.logo)
  }

  public override async pause (): Promise<void> {
    super.pause()
    this.mainContainer.interactiveChildren = false
  }

  public override async resume (): Promise<void> {
    super.resume()
    this.mainContainer.interactiveChildren = true
  }

  /** Resize the screen, fired whenever window size changes */
  public override resize (width: number, height: number) {
    super.resize(width, height)

    const mcx = width * 0.5
    const mcy = height * 0.5

    this.mainContainer.x = mcx
    this.mainContainer.y = mcy

    this.buttons.forEach((btn, i) => {
      btn.x = width / 2
      btn.y = config[i].y
    })

    this.logo.x = width - this.logo.width / 2 - 20
    this.logo.y = height - this.logo.height / 2 - 20
  }

  /** Show screen with animations */
  public override async show (): Promise<void> {
    // super.show() // intentionally commented, re-implemented

    this.btnPause.alpha = 0
    this.btnSettings.alpha = 0
    this.logo.alpha = 0

    const promises = [
      anime`fade-in`(this.btnPause).play(),
      anime`fade-in`(this.btnSettings).play(),

      anime`fade-in`(this.logo).play(),
    ]

    for (let i = 0; i < this.buttons.length; i++) {
      const btn = this.buttons[i]
      btn.animFadeInUp(0.1 * i).play()
    }

    await Promise.all(promises)
  }
}
