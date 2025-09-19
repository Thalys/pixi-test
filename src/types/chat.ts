export type Dialogue = { name: string, text: string }
export type Emoji = { name: string, url: string }
export type Avatar = { name: string, url: string, position: 'left' | 'right' }

export type ChatResponse = {
  dialogue: Dialogue[]
  emojies: Emoji[]
  avatars: Avatar[]
}
