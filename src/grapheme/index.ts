import { Assets } from 'pixi.js'
import { engine } from '@/engine/engine.singleton'
import { responseExample } from '@/grapheme/data'
import { createMessage } from '@/grapheme/grapheme'
import { createApp } from '@/grapheme/index.app'

/**
 * Magic Words
 *
 * Create a system that allows you to combine text and images like custom emojis
 * Use it to render a dialogue between characters with the data taken from this
 * endpoint: https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords
 */

(async () => {

  await createApp()
  const { stage, screen } = engine()

  for (let i = 0; i < responseExample.dialogue.length; i++) {
    const element = responseExample.dialogue[i]
    const message = await createMessage(element)
    message.label = `dialogue-${i}`
    stage.addChild(message)
    message.x = 100
    message.y = 100 * (i + 1)
  }

})()
