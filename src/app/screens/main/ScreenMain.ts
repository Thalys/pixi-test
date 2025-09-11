import type { FancyButton } from '@pixi/ui'
import type { AnimationPlaybackControls } from 'motion'
import { animate } from 'motion'
import { engine } from '@/app/engine-singleton'
import { ScreenOne } from '@/app/screens/one/ScreenOne'
import { ScreenBaseUI } from '@/app/screens/ScreenBaseUI'
import { Button } from '@/app/ui/Button'

/** The screen that holds the app */
export class MainScreen extends ScreenBaseUI {
  /** Assets bundles required by this screen */
  public static override assetBundles = ['main']
  private btnOne: FancyButton
  private btnTwo: FancyButton
  private btnThree: FancyButton

  constructor () {
    super()

    this.btnOne = new Button({
      text: 'Ace of Shadows',
      width: 400,
      height: 130,
    })
    this.btnOne.onPress.connect(() => { void engine().navigation.showScreen(ScreenOne) })
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
  }

  /** Resize the screen, fired whenever window size changes */
  public override resize (width: number, height: number) {
    super.resize(width, height)
    this.btnOne.x = width / 2
    this.btnOne.y = 200
    this.btnTwo.x = width / 2
    this.btnTwo.y = 340
    this.btnThree.x = width / 2
    this.btnThree.y = 480
  }

  /** Show screen with animations */
  public override async show (): Promise<void> {
    // super.show() // intentional, re-implemented
    engine().audio.bgm.play('main/sounds/bgm-main.mp3', { volume: 0.5 })

    const elementsToAnimate = [
      this.pauseButton,
      this.settingsButton,
      this.btnOne,
      this.btnTwo,
      this.btnThree,
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
