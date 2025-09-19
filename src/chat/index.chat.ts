import type { TAvatar, TChatResponse, TDialogue, TEmoji, TNamedResourceLink } from '@/chat/types'
import ky from 'ky'
import { Assets, Container, Sprite, TextStyle, Texture } from 'pixi.js'
import { ZINC } from '@/app/utils/colors'
import { engine } from '@/engine/engine.singleton'
import { distributeEvenly } from '@/engine/layout'
import { TextEmoji } from '@/engine/scene/text'
import { toMap } from '@/engine/utils/array'
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

const API_URL = 'https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords'

let mapEmojies: Map<string, TEmoji>
let mapAvatars: Map<string, TAvatar>

const AvatarUnknown: TAvatar = { name: 'unknown', url: 'unknown.png', position: 'right' }
TextEmoji.defaultOptions.autoSplit = true
TextEmoji.defaultOptions.charAnchor = 0
TextEmoji.defaultOptions.lineAnchor = 0
TextEmoji.defaultOptions.style = new TextStyle({ fontSize: 18, fill: ZINC[300] })
TextEmoji.defaultOptions.text = ''
TextEmoji.defaultOptions.wordAnchor = 0

export async function createDialog (dialogueData: TDialogue) {

  const container = new Container()
  const { name, text } = dialogueData

  const avatar = Sprite.from(AvatarUnknown.name)
  if (Assets.cache.has(name)) avatar.texture = Texture.from(name)
  avatar.setSize(30)
  avatar.y -= 10

  const message = new TextEmoji({ text })

  const avatarData = mapAvatars.get(dialogueData.name)
  const position = avatarData?.position ?? 'left'
  const positionalChildren
    = position === 'right'
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

  const response = await ky.get<TChatResponse>(API_URL).json()

  const { dialogue, emojies, avatars } = response

  await Promise.allSettled([
    loadExternalTextures(emojies),
    loadExternalTextures(avatars),
  ])

  mapEmojies = toMap(emojies, res => res.name)
  mapAvatars = toMap(avatars, res => res.name)
  mapAvatars.set(AvatarUnknown.name, AvatarUnknown)

  dialogue.map(async (dialog, i) => {
    const child = await createDialog(dialog)
    child.label = `dialogue-${i}`
    stage.addChild(child)
    child.x = 75
    child.y = 50 * (i + 1)
  })
}
