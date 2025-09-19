import type { Texture } from 'pixi.js'
import type { TAvatar, TChatResponse, TDialogue, TNamedResourceLink } from '@/chat/types'
import ky from 'ky'
import { Assets, Container, Sprite, TextStyle } from 'pixi.js'
import { ZINC } from '@/app/utils/colors'
import { engine } from '@/engine/engine.singleton'
import { flex } from '@/engine/layout'
import { TextEmoji } from '@/engine/scene/text'
import { toMap } from '@/engine/utils/array'

/**
 * Magic Words
 *
 * Create a system that allows you to combine text and images like custom emojis
 * Use it to render a dialogue between characters with the data taken from this
 * endpoint: https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords
 */

const API_URL = 'https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords'

let mapAvatars: Map<string, TAvatar>

const AvatarUnknown: TAvatar = { name: 'unknown', url: 'unknown.png', position: 'right' }
TextEmoji.defaultOptions.autoSplit = true
TextEmoji.defaultOptions.charAnchor = 0
TextEmoji.defaultOptions.lineAnchor = 0
TextEmoji.defaultOptions.style = new TextStyle({ fontSize: 16, fill: ZINC[300] })
TextEmoji.defaultOptions.text = ''
TextEmoji.defaultOptions.wordAnchor = 0

export async function createDialog (dialogueData: TDialogue) {
  const { text } = dialogueData
  const { name, position } = mapAvatars.get(dialogueData.name) ?? AvatarUnknown

  const container = new Container()

  const avatar = Sprite.from(name)
  avatar.setSize(40)
  avatar.y -= 15

  const message = new TextEmoji({ text })

  const positionalChildren
    = position === 'right'
      ? [message, avatar]
      : [avatar, message]
  container.addChild(...positionalChildren)

  flex(container, {
    direction: position === 'left' ? 'row' : 'row-reverse',
    minSize: 700,
    gap: 20,
  })

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

export async function fetchData () {
  const response = await ky.get<TChatResponse>(API_URL).json()
  const { dialogue, emojies, avatars } = response
  await Promise.allSettled([
    loadExternalTextures(emojies),
    loadExternalTextures(avatars),
  ])
  mapAvatars = toMap(avatars, res => res.name)
  mapAvatars.set(AvatarUnknown.name, AvatarUnknown)

  return { dialogue, emojies, avatars }
}

export async function layoutScreen ({ dialogue }: { dialogue: TDialogue[] }) {
  const { stage } = engine()

  const container = new Container()
  container.x = 75
  container.y = 75

  const messages = await Promise.all(dialogue.map(async (dialog, i) => {
    const msg = await createDialog(dialog)
    msg.label = `msg-${i}`
    return msg
  }))

  container.addChild(...messages)

  flex(container, {
    direction: 'column',
    gap: 5,
  })

  stage.addChild(container)
}

export async function init () {
  const data = await fetchData()
  layoutScreen(data)
}
