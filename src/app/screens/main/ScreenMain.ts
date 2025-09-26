import type { AppScreens, IAppScreen } from '@/engine/navigation.types'
import { Container } from 'pixi.js'
import { anime } from '@/anime/anime'
import { config } from '@/app/screens/main/config'
import { PixiLogo } from '@/app/screens/main/pixi-logo'
import { Button } from '@/app/ui/Button'
import { engine } from '@/engine/engine.singleton'

export class ScreenMain extends Container implements IAppScreen {
  public definition: AppScreens = 'ScreenMain'
  public static assetBundles = ['main']
  public mainContainer: Container
  private buttons: Button[]
  private logo: PixiLogo

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

    this.logo = new PixiLogo()
    this.addChild(this.logo)
  }

  public async pause (): Promise<void> {
    this.mainContainer.interactiveChildren = false
  }

  public async resume (): Promise<void> {
    this.mainContainer.interactiveChildren = true
  }

  public resize (width: number, height: number) {

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

  public async show (): Promise<void> {
    this.logo.alpha = 0

    const promises = [
      anime`fade-in`(this.logo).play(),
    ]

    for (let i = 0; i < this.buttons.length; i++) {
      const btn = this.buttons[i]
      promises.push(btn.animFadeInUp(0.1 * i).play())
    }

    await Promise.all(promises)
  }
}
