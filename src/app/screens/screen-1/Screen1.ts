import type { AppScreens } from '@/engine/navigation/navigation.types'
import { engine } from '@/app/engine-singleton'
import { animateCards } from '@/app/screens/screen-1/anim'
import { CardBack } from '@/app/screens/screen-1/card-back'
import { config } from '@/app/screens/screen-1/config'
import { ScreenBaseUI } from '@/app/screens/ScreenBaseUI'

export class Screen1 extends ScreenBaseUI {
  public override definition: AppScreens = 'Screen1'
  public override label: string = 'Screen1'
  /** Assets bundles required by this screen */
  public static override assetBundles = ['main', 'ace_of_shadows']

  private cardStack: CardBack[] = []
  private deckPositions: { x: number, y: number }[] = []

  constructor () {
    super()

    for (let i = 0; i < config.cards.count; i++) {
      const card = new CardBack()
      this.cardStack.push(card)
      this.addChild(card)
    }
  }

  /** Resize the screen, fired whenever window size changes */
  public override resize (width: number, height: number) {
    super.resize(width, height)

    const { screen } = engine()

    // Calculate deck positions at the bottom
    const deckY = screen.height * 0.85
    const deckSpacing = screen.width / 4
    this.deckPositions = [
      { x: deckSpacing, y: deckY },
      { x: deckSpacing * 2, y: deckY },
      { x: deckSpacing * 3, y: deckY },
    ]

    for (let i = 0; i < this.cardStack.length; i++) {
      const card = this.cardStack.at(i)
      if (!card) { continue }

      const borderOffsetX = screen.width * config.cards.borderOffsetPercentage
      const availableWidth = screen.width - (borderOffsetX * 2 + card.visualWidth())
      const offsetX = availableWidth / config.cards.count
      card.x = borderOffsetX + i * offsetX + card.visualWidth() / 2
      card.y = screen.height * config.cards.borderOffsetPercentage + card.visualHeight() / 2
    }
  }

  /** Show screen with animations */
  public override async show (): Promise<void> {
    await animateCards(this.cardStack, this.deckPositions)
  }
}
