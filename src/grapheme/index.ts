import type { TextString, TextStyleOptions } from 'pixi.js'
import { Assets, Container, Sprite, Text, TextStyle } from 'pixi.js'
import { engine } from '@/engine/engine.singleton'
import { responseExample } from '@/grapheme/data'
import { createApp } from '@/grapheme/index.app'

(async () => {

  await createApp()
  const { stage } = engine()
  const message = createMessage(responseExample.dialogue[0].text)
  stage.addChild(message)
})()

export function createMessage (message: string) {

  const text: TextString = message
  // {
  //   fill: '#FFFFFF',
  //   fontSize: 24,
  //   stroke: { color: '#4a1850', width: 5, join: 'round' },
  //   dropShadow: {
  //     color: '#000000',
  //     blur: 4,
  //     angle: Math.PI / 6,
  //     distance: 6,
  //   },
  //   wordWrap: true,
  //   wordWrapWidth: 440,
  // }
  const tsOptions: TextStyleOptions = { fontSize: 18, fill: 0xFFFFFF }
  const style = new TextStyle(tsOptions)
  const child = new Text({ text, style })
  child.x = screen.width * 0.5
  child.y = 75
  child.anchor = 0.5
  return child
}

export async function parse () {
  const container = new Container()
  let x = 0

  const segments = [
    { type: 'text', content: 'Hello ' },
    { type: 'emoji', key: 'smile' },
    { type: 'text', content: ' world!' },
  ]

  for (const seg of segments) {
    if (seg.type === 'text') {
      const textObj = new Text(seg.content, {/* style */})
      textObj.x = x
      container.addChild(textObj)
      x += textObj.width
    } else if (seg.type === 'emoji') {
      const texture = await Assets.load(`emojis/${seg.key}.png`)
      const sprite = new Sprite(texture)
      sprite.x = x
      // sprite.y = someBaselineAdjustment // Align with text baseline
      sprite.y = 0 // Align with text baseline
      sprite.width = sprite.height = 20 // match text size
      container.addChild(sprite)
      x += sprite.width
    }
  }
}
