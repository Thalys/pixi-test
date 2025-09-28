import type { FancyButton } from '@pixi/ui'
import type { AppScreens, IAppScreen } from '@/engine/navigation.types'
import { animate } from 'motion'
import { BlurFilter, Container, NineSliceSprite, Sprite, Texture } from 'pixi.js'
import { anime, createCustomAnimation } from '@/anime/anime'
import actions from '@/app/actions'
import buttons from '@/app/buttons'
import textures from '@/app/textures'
import { Label } from '@/app/ui/Label'
import { ZINC } from '@/app/utils/colors'
import { engine } from '@/engine/engine.singleton'

/** Popup that shows up when gameplay is paused */
export class PopupPause extends Container implements IAppScreen {

  public definition: AppScreens = 'PopupPause'
  /** The dark semi-transparent background covering current screen */
  private bg: Sprite
  /** Container for the popup UI components */
  private panel: Container
  /** The popup title label */
  private title: Label
  /** Button that closes the popup */
  private doneButton: FancyButton

  constructor () {
    super()

    this.bg = new Sprite(Texture.WHITE)
    this.bg.tint = 0x0
    this.bg.interactive = true
    this.addChild(this.bg)

    this.panel = new Container()
    this.addChild(this.panel)

    const panelBg = new NineSliceSprite({
      texture: textures.popupBg,
      leftWidth: 42,
      topHeight: 42,
      rightWidth: 42,
      bottomHeight: 42,
      width: 300,
      height: 280,
    })
    panelBg.anchor.set(0.5)
    this.panel.addChild(panelBg)

    this.title = new Label({
      text: 'PAUSED',
      style: { fill: ZINC[800], fontSize: 42 },
    })
    this.title.y = -70
    this.panel.addChild(this.title)

    this.doneButton = buttons.createBtnPopupDone('RESUME')
    this.doneButton.y = 70
    this.panel.addChild(this.doneButton)
  }

  /** Resize the popup, fired whenever window size changes */
  public resize (width: number, height: number) {
    this.bg.position.set(0)
    this.bg.width = width
    this.bg.height = height
    this.panel.position.set(width * 0.5, height * 0.5)
  }

  /** Present the popup, animated */
  public async show () {
    const currentEngine = engine()
    if (currentEngine.navigation.currentScreen) {
      currentEngine.navigation.currentScreen.filters = [
        new BlurFilter({ strength: 5 }),
      ]
    }
    this.bg.alpha = 0
    anime`popup-bg-in`(
      this.bg,
      {
        onComplete: () => {
          this.bg.once('pointerup', () => actions.dismissPopup)
        },
      },
    ).play()

    this.panel.pivot.y = -400
    await createCustomAnimation(
      { y: -400 },
      { y: 0 },
      { duration: 0.3, ease: 'backOut' },
    )(this.panel.pivot).play()
  }

  /** Dismiss the popup, animated */
  public async hide () {
    const currentEngine = engine()
    if (currentEngine.navigation.currentScreen) {
      currentEngine.navigation.currentScreen.filters = []
    }
    animate(this.bg, { alpha: 0 }, { duration: 0.2, ease: 'linear' })
    await animate(
      this.panel.pivot,
      { y: -500 },
      { duration: 0.3, ease: 'backIn' },
    )
  }
}
