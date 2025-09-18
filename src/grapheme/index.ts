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

  const message = await createMessage(responseExample.dialogue[0])
  message.label = `dialogue-${0}`
  stage.addChild(message)
  message.x = 100
  message.y = 100

  const message2 = await createMessage(responseExample.dialogue[0])
  message2.label = `dialogue-${1}`
  stage.addChild(message2)
  message2.x = 100
  message2.y = 300
})()
