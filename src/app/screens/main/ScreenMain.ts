import type { FancyButton } from '@pixi/ui'
import type { AnimationPlaybackControls } from 'motion'
import type { AppScreens } from '@/engine/navigation/types'
import { animate } from 'motion'
import { Container } from 'pixi.js'
import { engine } from '@/app/engine-singleton'
import { Logo } from '@/app/screens/main/Logo'
import { Screen1 } from '@/app/screens/screen-1/Screen1'
import { ScreenBaseUI } from '@/app/screens/ScreenBaseUI'
import { Button } from '@/app/ui/Button'

/** The screen that holds the app */
export class ScreenMain extends ScreenBaseUI {
  public override definition: AppScreens = 'ScreenMain'
  /** Assets bundles required by this screen */
  public static override assetBundles = ['main']
  public mainContainer: Container
  private btnOne: FancyButton
  private btnTwo: FancyButton
  private btnThree: FancyButton
  private logo: Logo

  constructor () {
    super()

    this.mainContainer = new Container()
    this.addChild(this.mainContainer)

    this.btnOne = new Button({
      text: 'Ace of Shadows',
      width: 400,
      height: 130,
    })
    this.btnOne.onPress.connect(() => {
      void engine().navigation.showScreen(Screen1)
    })
    this.addChild(this.btnOne)

    this.btnTwo = new Button({
      text: 'Magic Words',
      width: 400,
      height: 130,
    })
    this.btnTwo.onPress.connect(() => { console.warn('Not implemented') })
    this.addChild(this.btnTwo)

    this.btnThree = new Button({
      text: 'Phoenix Flame',
      width: 400,
      height: 130,
    })
    this.btnThree.onPress.connect(() => { console.warn('Not implemented') })
    this.addChild(this.btnThree)

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

    this.btnOne.x = width / 2
    this.btnOne.y = 200
    this.btnTwo.x = width / 2
    this.btnTwo.y = 340
    this.btnThree.x = width / 2
    this.btnThree.y = 480

    this.logo.x = width - this.logo.width / 2 - 20
    this.logo.y = height - this.logo.height / 2 - 20
  }

  /** Show screen with animations */
  public override async show (): Promise<void> {
    // super.show() // intentional, re-implemented
    engine().audio.bgm.play('main/sounds/bgm-main.mp3', { volume: 0.5 })

    const elementsToAnimate = [
      this.btnPause,
      this.btnSettings,
      this.btnOne,
      this.btnTwo,
      this.btnThree,
      this.logo,
    ]

    let finalPromise!: AnimationPlaybackControls
    for (const element of elementsToAnimate) {
      element.alpha = 0
      finalPromise = animate(
        element,
        { alpha: 1 },
        { duration: 0.3, delay: 0.75, ease: 'backOut' },
      )
    }

    await finalPromise.finished
  }
}
