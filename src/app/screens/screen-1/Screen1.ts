import type { Ticker } from 'pixi.js'
import type { AppScreens } from '@/engine/navigation/types'
import { engine } from '@/app/engine-singleton'
import { CardBack } from '@/app/screens/screen-1/card-back'
import { ScreenBaseUI } from '@/app/screens/ScreenBaseUI'

/**
 * Ace of Shadows
 *
 * Create 144 sprites (NOT graphic objects) that are stacked on top of each other like
 * cards in a deck. The top card must cover the bottom card, but not completely.
 * Every 1 second the top card should move to a different stack - the animation of the
 * movement should take 2 seconds.
 */

export class Screen1 extends ScreenBaseUI {
  public override definition: AppScreens = 'Screen1'
  public override label: string = 'Screen1'
  /** Assets bundles required by this screen */
  public static override assetBundles = ['main', 'ace_of_shadows']

  private cardStack: CardBack[] = []

  constructor () {
    super()

    const { screen } = engine()

    for (let i = 0; i < 1; i++) {
      const card = new CardBack()
      this.cardStack.push(card)
      this.mainContainer.addChild(card)

      card.x = screen.width * 0.1 + i * 10
      card.y = screen.height * 0.1
    }
  }

  /** Prepare the screen just before showing */
  public override prepare () {}

  /** Update the screen */
  public override update (time: Ticker) {}

  /** Fully reset */
  public override reset () {}

  /** Resize the screen, fired whenever window size changes */
  public override resize (width: number, height: number) {
    super.resize(width, height)
  }

  /** Show screen with animations */
  public override async show (): Promise<void> {}

  public override async hide () {}
}
