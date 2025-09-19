import type { Texture } from 'pixi.js'
import type { TAvatar, TChatResponse, TDialogue, TNamedResourceLink } from '@/chat/types'
import ky from 'ky'
import { Assets, Container, Sprite, TextStyle } from 'pixi.js'
import { ZINC } from '@/app/utils/colors'
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

const _log = logger.custom('src/chat/chat.ts')
const log = (...args: Parameters<typeof _log>) => _log('\n   ', ...args)

const AvatarUnknown: TAvatar = { name: 'unknown', url: 'unknown.png', position: 'left' }
TextEmoji.defaultOptions.autoSplit = true
TextEmoji.defaultOptions.style = new TextStyle({
  fontSize: 18,
  fill: ZINC[400],
})

export async function createDialog (dialogueData: TDialogue, avatarPosition: TAvatar['position']) {
  const container = new Container()
  const { name, text } = dialogueData

  const texture = Assets.get<Texture>(name) ?? Assets.get<Texture>(AvatarUnknown.name)
  const avatar = Sprite.from(texture)
  avatar.setSize(30)
  avatar.y -= 10

  const message = new TextEmoji({ text })

  const positionalChildren
    = avatarPosition === 'right'
      ? [message, avatar]
      : [avatar, message]

  container.addChild(...positionalChildren)

  distributeEvenly(container)

  return container
}

export async function loadExternalTextures (data: TNamedResourceLink[]) {

  const promises = data.map(
    async ({ name, url }): Promise<Texture> => {
      const assetData = { alias: name, src: url, parser: 'texture' }
      return Assets.load<Texture>(assetData)
    },
  )

  await Promise.allSettled(promises)
}

export async function init () {
  const { stage } = engine()

  const response = await ky.get<TChatResponse>('https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords').json()

  log('\n  ', response)

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

  mapAvatars.set(AvatarUnknown.name, AvatarUnknown)

  for (let i = 0; i < dialogue.length; i++) {
    const message = dialogue[i]
    const avatarPosition = mapAvatars.get(message.name)?.position ?? 'left'
    const child = await createDialog(message, avatarPosition)
    child.label = `dialogue-${i}`
    stage.addChild(child)
    child.x = 100
    child.y = 100 * (i + 1)
  }
}
