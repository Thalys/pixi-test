import type { FancyButton } from '@pixi/ui'
import type { AnimationPlaybackControls } from 'motion'
import type { Ticker } from 'pixi.js'
import { animate } from 'motion'
import { engine } from '@/app/getEngine'
import { Bouncer } from '@/app/screens/main/Bouncer'
import { ScreenBaseUI } from '@/app/screens/ScreenBaseUI'
import { Button } from '@/app/ui/Button'

/** The screen that holds the app */
export class MainScreen extends ScreenBaseUI {
  /** Assets bundles required by this screen */
  public static override assetBundles = ['main']
  private addButton: FancyButton
  private removeButton: FancyButton
  private bouncer: Bouncer

  constructor () {
    super()

    this.bouncer = new Bouncer()

    this.addButton = new Button({
      text: 'Add',
      width: 175,
      height: 110,
    })
    this.addButton.onPress.connect(() => this.bouncer.add())
    this.addChild(this.addButton)

    this.removeButton = new Button({
      text: 'Remove',
      width: 175,
      height: 110,
    })
    this.removeButton.onPress.connect(() => this.bouncer.remove())
    this.addChild(this.removeButton)
  }

  /** Update the screen */
  public override update (time: Ticker) {
    super.update(time)
    if (this.paused) { return }
    this.bouncer.update()
  }

  /** Resize the screen, fired whenever window size changes */
  public override resize (width: number, height: number) {
    super.resize(width, height)
    this.removeButton.x = width / 2 - 100
    this.removeButton.y = height - 75
    this.addButton.x = width / 2 + 100
    this.addButton.y = height - 75
    this.bouncer.resize(width, height)
  }

  /** Show screen with animations */
  public override async show (): Promise<void> {
    // don't call super, re-implemented
    // super.show()
    engine().audio.bgm.play('main/sounds/bgm-main.mp3', { volume: 0.5 })

    const elementsToAnimate = [
      this.pauseButton,
      this.settingsButton,
      this.addButton,
      this.removeButton,
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
    this.bouncer.show(this)
  }
}
