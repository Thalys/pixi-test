import type { Texture } from 'pixi.js'
import type { TAvatar, TChatResponse, TDialogue, TNamedResourceLink } from '@/chat/types'
import ky from 'ky'
import { Assets, Container, Sprite, TextStyle } from 'pixi.js'
import { ZINC } from '@/app/utils/colors'
import { createApp } from '@/chat/index.app'
import { engine } from '@/engine/engine.singleton'
import { distributeEvenly } from '@/engine/layout'
import { TextEmoji } from '@/engine/scene/text'
import { logger } from '@/tools/logger'

/**
 * Magic Words
 *
 * Create a system that allows you to combine text and images like custom emojis
 * Use it to render a dialogue between characters with the data taken from this
 * endpoint: https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords
 */

(async () => {

  await createApp()
  const { stage } = engine()

  TextEmoji.defaultOptions.autoSplit = true
  TextEmoji.defaultOptions.style = new TextStyle({
    fontSize: 18,
    fill: ZINC[400],
  })

  const response = await ky.get<TChatResponse>('https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords').json()

  logger.custom('src/chat/index.ts')('\n  ', response)

  const { dialogue, emojies, avatars } = response

  const resources = [...emojies, ...avatars]
  await loadExternalTextures(resources)

  const mapAvatars = response.avatars
    .reduce(
      (acc, obj) => {
        acc.set(obj.name, obj)
        return acc
      },
      new Map<string, TAvatar>(),
    )

  for (let i = 0; i < dialogue.length; i++) {
    const message = dialogue[i]
    const avatarPosition = mapAvatars.get(message.name)?.position ?? 'left'
    const child = await createDialog(message, avatarPosition)
    child.label = `dialogue-${i}`
    stage.addChild(child)
    child.x = 100
    child.y = 100 * (i + 1)
  }

})()

export async function createDialog (dialogueData: TDialogue, avatarPosition: TAvatar['position']) {
  const container = new Container()
  const { name, text } = dialogueData

  const avatar = Sprite.from(await Assets.load(name))
  avatar.setSize(30)
  avatar.y -= 10

  const message = new TextEmoji({ text })

  const positionalChildren
    = avatarPosition === 'right'
      ? [message, avatar]
      : [avatar, message]

  container.addChild(...positionalChildren)

  distributeEvenly(container)

  // logSize(avatar.image)
  // logSize(message)
  // logSize(container)

  return container
}

export async function loadExternalTextures (data: TNamedResourceLink[]) {

  const promises = data.map(
    async ({ name, url }) => Assets.load<Texture>({
      alias: name,
      src: url,
      parser: 'texture',
    }),
  )

  await Promise.allSettled(promises)
}
