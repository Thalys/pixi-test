import type { CardBack } from '@/app/screens/screen-1/card-back'
import { animate } from 'motion'
import { config } from '@/app/screens/screen-1/config'

async function moveToTargets (cardStack: CardBack[], targets: { x: number, y: number }[]) {
  const { durationInSeconds: duration } = config.cards.animation
  const cards = cardStack.slice()
  while (cards.length > 0) {
    const { x, y } = targets[cards.length % 3]
    const card = cards.splice(0)
    await animate(card, { x, y }, { duration })
  }
}

export const animateCards = async (
  cards: CardBack[],
  targets: { x: number, y: number }[],
) => {
  await moveToTargets(cards, targets)
}
