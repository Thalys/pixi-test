import type { FancyButton } from '@pixi/ui'
import type { AppScreens, IAppScreen, TAssetBundleId } from '@/engine/navigation.types'
import { Container } from 'pixi.js'
import { anime, createCustomAnimation } from '@/anime/anime'
import actions from '@/app/actions'
import buttons from '@/app/buttons'
import { PixiLogo } from '@/app/screens/main/pixi-logo'
import { Screen1 } from '@/app/screens/screen-1/Screen1'
import { Screen2 } from '@/app/screens/screen-2/Screen2'
import { Screen3 } from '@/app/screens/screen-3/Screen3'

const config = [
  { text: 'Ace of Shadows', y: 150, screen: Screen1 },
  { text: 'Magic Words', y: 270, screen: Screen2 },
  { text: 'Phoenix Flame', y: 390, screen: Screen3 },
] as const

export class ScreenMain extends Container implements IAppScreen {
  public definition: AppScreens = 'ScreenMain'
  public static assetBundles = ['preload', 'main'] as TAssetBundleId[]
  public mainContainer: Container
  private buttons: FancyButton[]
  private logo: PixiLogo

  constructor () {
    super()

    this.mainContainer = new Container()
    this.addChild(this.mainContainer)

    this.buttons = config.map(({ text, screen }) => {
      const btn = buttons.createBtnPlay(text, () => actions.showScreen(screen))
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

    const promises = [anime`fade-in`(this.logo).play()]

    for (let i = 0; i < this.buttons.length; i++) {
      promises.push(this.btnFadeInUp(this.buttons[i], 0.1 * i).play())
    }

    await Promise.all(promises)
  }

  public btnFadeInUp (btn: FancyButton, delay: number = 0) {
    const fadeInUp = createCustomAnimation(
      { alpha: 0, y: btn.y + 20 },
      { alpha: 1, y: btn.y },
      { delay, duration: 0.5, ease: 'circIn' },
    )
    return fadeInUp(btn)
  }
}
