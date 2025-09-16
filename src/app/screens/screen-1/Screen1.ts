import type { AppScreens } from '@/engine/navigation.types'
import { Card } from '@/app/screens/screen-1/card'
import { config } from '@/app/screens/screen-1/config'
import { ScreenBaseUI } from '@/app/screens/ScreenBaseUI'
import { engine } from '@/engine/engine.singleton'
import { waitFor } from '@/engine/utils/waitFor'

export class Screen1 extends ScreenBaseUI {
  public override definition: AppScreens = 'Screen1'
  public override label: string = 'Screen1'
  /** Assets bundles required by this screen */
  public static override assetBundles = ['main', 'ace_of_shadows']

  private cardStack: Card[] = []
  private deckPositions: { [key: string]: { x: number, y: number } } = {}

  constructor () {
    super()

    for (let i = 0; i < config.cards.count; i++) {
      const card = new Card()
      this.cardStack.push(card)
      this.addChild(card)
    }
  }

  /** Resize the screen, fired whenever window size changes */
  public override resize (width: number, height: number) {
    super.resize(width, height)

    const { screen } = engine()

    this.deckPositions = {
      [config.cards.options[0]]: { x: 150, y: 150 },
      [config.cards.options[1]]: { x: screen.width - 150, y: 150 },
      [config.cards.options[2]]: { x: 150, y: screen.height - 150 },
      [config.cards.options[3]]: { x: screen.width - 150, y: screen.height - 150 },
    }

    const borderOffsetPercentage = config.cards.borderOffsetPercentage
    const sHeight = screen.height - borderOffsetPercentage * 2

    for (let i = 0; i < this.cardStack.length; i++) {
      const card = this.cardStack.at(i)
      if (!card) { continue }

      const cHeight = card.visualHeight()

      const borderOffsetX = screen.width * borderOffsetPercentage
      const availableWidth = screen.width - (borderOffsetX * 2 + card.visualWidth())
      const offsetX = availableWidth / config.cards.count
      card.x = borderOffsetX + i * offsetX
      card.y = borderOffsetPercentage + sHeight * 0.5
    }
  }

  /** Show screen with animations */
  public override async show (): Promise<void> {

    let promises = this.cardStack.map(async (card, i) => {
      card.alpha = 0
      return card.animFadeInUp(i * 0.1).play()
    })
    await Promise.all(promises)

    await waitFor(1)

    promises = this.cardStack.toReversed().map(async (card, i) => {
      const { x, y } = this.deckPositions[card.cardOption]
      return card.animSlide(x, y, 2, i * 0.1).play()
    })
    await Promise.all(promises)
  }
}
