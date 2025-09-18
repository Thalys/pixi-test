import { Assets, Container, Sprite, Text } from 'pixi.js'
import { engine } from '@/engine/engine.singleton'
import { distributeEvenly } from '@/engine/layout'
import { responseExample } from '@/grapheme/data'
import { createText } from '@/grapheme/grapheme.text'
import { logger } from '@/tools/logger'

type Dialogue = { name: string, text: string }
type Emoji = { name: string, url: string }
type Avatar = { name: string, url: string, position: string }

export async function createMessage ({ name, text }: Dialogue) {
  const { screen } = engine()

  const container = new Container()

  const avatar = await getAvatar(name)
  container.addChild(avatar.image)

  const message = await createText(text)
  container.addChild(message)

  distributeEvenly(container, {

  })

  // logSize(avatar.image)
  // logSize(message)
  // logSize(container)

  return container
}

export function logSize (visual: Container, label?: string) {
  const _label = label ?? visual.label ?? ''
  logger.debug(`${_label} calculateContainerSize : ${calculateContainerSize(visual, 'width')}x${calculateContainerSize(visual, 'height')}`)
  logger.debug(`${_label} getSize                : ${visual.getSize().width}x${visual.getSize().height}`)
  logger.debug(`${_label} getBounds              : ${visual.getBounds().width}x${visual.getBounds().height}`)
  logger.debug(`${_label} getLocalBounds         : ${visual.getLocalBounds().width}x${visual.getLocalBounds().height}`)
}

export async function getAvatar (username: string): Promise<{ image: Sprite } & Avatar> {

  const map = responseExample.avatars
    .reduce(
      (acc, obj) => {
        acc.set(obj.name, obj)
        return acc
      },
      new Map<string, Avatar>(),
    )
  const avatar = map.get(username) ?? { name: '', url: '', position: 'left' }
  const image = await createImage(avatar)
  return { image, ...avatar }
}

export async function createImage (
  { name, url }: { name: string, url: string },
) {
  const tUrl = await Assets.load({
    alias: name,
    src: url,
    parser: 'texture',
  })
  const child: Sprite = Sprite.from(tUrl)
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
