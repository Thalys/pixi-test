import type { Dialogue } from '@/grapheme/grapheme.types'
import { Container } from 'pixi.js'
import { engine } from '@/engine/engine.singleton'
import { distributeEvenly } from '@/engine/layout'
import { getAvatar } from '@/grapheme/grapheme.image'
import { parse } from '@/grapheme/grapheme.text'
import { logger } from '@/tools/logger'

export async function createMessage ({ name, text }: Dialogue) {
  const { screen } = engine()

  const container = new Container()

  const avatar = await getAvatar(name)
  avatar.image.setSize(30)
  avatar.image.y -= 10

  const message = await parse(text)

  if (avatar.position === 'right') {
    container.addChild(message, avatar.image)
  } else {
    container.addChild(avatar.image, message)
  }

  distributeEvenly(container)

  // logSize(avatar.image)
  // logSize(message)
  // logSize(container)

  return container
}

export function logSize (visual: Container, label?: string) {
  const _label = label ?? visual.label ?? ''
  logger.debug(`${_label} getSize                : ${visual.getSize().width}x${visual.getSize().height}`)
  logger.debug(`${_label} getBounds              : ${visual.getBounds().width}x${visual.getBounds().height}`)
  logger.debug(`${_label} getLocalBounds         : ${visual.getLocalBounds().width}x${visual.getLocalBounds().height}`)
}
