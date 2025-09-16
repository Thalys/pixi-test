import type { Card } from '@/app/screens/screen-1/card'
import { animate } from 'motion'
import { config } from '@/app/screens/screen-1/config'

async function moveToTargets (cardStack: Card[], targets: { x: number, y: number }[]) {
  const { durationInSeconds: duration } = config.cards.animation
  const cards = cardStack.slice()
  while (cards.length > 0) {
    const { x, y } = targets[cards.length % 3]
    const card = cards.splice(0)
    await animate(card, { x, y }, { duration })
  }
}

export const animateCards = async (
  cards: Card[],
  targets: { x: number, y: number }[],
) => {
  await moveToTargets(cards, targets)
}
