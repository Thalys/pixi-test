import type { Avatar, Emoji } from '@/grapheme/grapheme.types'
import { Assets, Sprite } from 'pixi.js'
import { responseExample } from '@/grapheme/data'

export async function fetchEmoji (id: string) {

  const map = responseExample.emojies
    .reduce(
      (acc, obj) => {
        acc.set(obj.name, obj)
        return acc
      },
      new Map<string, Emoji>(),
    )
  const emoji = map.get(id) ?? { name: '', url: '' }
  return fetchImage(emoji)
}

export async function getEmoji (id: string): Promise<{ image: Sprite } & Emoji> {

  const map = responseExample.emojies
    .reduce(
      (acc, obj) => {
        acc.set(obj.name, obj)
        return acc
      },
      new Map<string, Emoji>(),
    )
  const emoji = map.get(id) ?? { name: '', url: '' }
  const image = await fetchImage(emoji)
  return { image, ...emoji }
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
  const image = await fetchImage(avatar)
  return { image, ...avatar }
}

export async function fetchImage (
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
