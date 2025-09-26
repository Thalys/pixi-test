/**
 * Ace of Shadows
 *
 * Create 144 sprites (NOT graphic objects) that are stacked on top of each other like
 * cards in a deck. The top card must cover the bottom card, but not completely.
 * Every 1 second the top card should move to a different stack - the animation of the
 * movement should take 2 seconds.
 */

export const config = {
  cards: {
    properties: {
      width: 672,
      height: 960,
    },
    count: 144,
    borderOffsetPercentage: 0.08,
    animation: {
      durationInSeconds: 2,
    },
  },
}
