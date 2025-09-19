import type { TAvatar, TChatResponse, TDialogue } from '@/app/features/chat/index.types'
import ky from 'ky'
import { Container, Sprite } from 'pixi.js'
import { API_URL, AvatarUnknown } from '@/app/features/chat/index.config'
import { loadExternalTextures } from '@/app/features/chat/index.utils'
import { flex } from '@/engine/layout'
import { TextEmoji } from '@/engine/scene/text'
import { toMap } from '@/lib/array'

export async function createDialog (dialogueData: TDialogue) {
  const { text } = dialogueData
  const { name, position } = _mapAvatars.get(dialogueData.name) ?? AvatarUnknown

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

let _fetchDataPromise: Promise<TChatResponse> | null = null
let _mapAvatars: Map<string, TAvatar>
export async function fetchData (): Promise<TChatResponse> {
  if (_fetchDataPromise) return _fetchDataPromise

  _fetchDataPromise = (async () => {
    const response = await ky.get<TChatResponse>(API_URL).json()
    const { emojies, avatars } = response
    await Promise.allSettled([
      loadExternalTextures(emojies),
      loadExternalTextures(avatars),
    ])
    _mapAvatars = toMap(avatars, res => res.name)
    _mapAvatars.set(AvatarUnknown.name, AvatarUnknown)

    return response
  })()

  return _fetchDataPromise
}

export async function layoutScreen ({ dialogue }: { dialogue: TDialogue[] }) {
  const container = new Container()

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

  return container
}
