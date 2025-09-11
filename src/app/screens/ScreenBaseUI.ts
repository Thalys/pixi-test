import type { AnimationPlaybackControls } from 'motion'
import type { Ticker } from 'pixi.js'
import { FancyButton } from '@pixi/ui'
import { animate } from 'motion'
import { Container } from 'pixi.js'
import { engine } from '@/app/engine-singleton'
import { PausePopup } from '@/app/popups/PausePopup'
import { SettingsPopup } from '@/app/popups/SettingsPopup'

/** The screen that holds the app */
export class ScreenBaseUI extends Container {
  /** Assets bundles required by this screen */
  public static assetBundles = ['main']
  public mainContainer: Container
  protected pauseButton: FancyButton
  protected settingsButton: FancyButton
  protected paused = false

  constructor () {
    super()

    this.mainContainer = new Container()
    this.addChild(this.mainContainer)

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
    this.pauseButton = new FancyButton({
      defaultView: 'icon-pause.png',
      anchor: 0.5,
      animations: buttonAnimations,
    })
    this.pauseButton.onPress.connect(() => {
      void engine().navigation.presentPopup(PausePopup)
    })
    this.addChild(this.pauseButton)

    this.settingsButton = new FancyButton({
      defaultView: 'icon-settings.png',
      anchor: 0.5,
      animations: buttonAnimations,
    })
    this.settingsButton.onPress.connect(() => {
      void engine().navigation.presentPopup(SettingsPopup)
    })
    this.addChild(this.settingsButton)
  }

  /** Prepare the screen just before showing */
  public prepare () {}

  /** Update the screen */
  public update (time: Ticker) {}

  /** Pause gameplay - automatically fired when a popup is presented */
  public async pause () {
    this.mainContainer.interactiveChildren = false
    this.paused = true
  }

  /** Resume gameplay */
  public async resume () {
    this.mainContainer.interactiveChildren = true
    this.paused = false
  }

  /** Fully reset */
  public reset () {}

  /** Resize the screen, fired whenever window size changes */
  public resize (width: number, height: number) {
    const mcx = width * 0.5
    const mcy = height * 0.5

    this.mainContainer.x = mcx
    this.mainContainer.y = mcy
    this.pauseButton.x = 30
    this.pauseButton.y = 30
    this.settingsButton.x = width - 30
    this.settingsButton.y = 30
  }

  /** Show screen with animations */
  public async show (): Promise<void> {
    const elementsToAnimate = [
      this.pauseButton,
      this.settingsButton,
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

  /** Hide screen with animations */
  public async hide () {}

  /** Auto pause the app when window go out of focus */
  public blur () {
    if (!engine().navigation.currentPopup) {
      engine().navigation.presentPopup(PausePopup)
    }
  }
}
