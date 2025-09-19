export type TNamedResourceLink = { name: string, url: string }
export type TLayout = { position: 'left' | 'right' }
export type TDialogue = { name: string, text: string }
export type TEmoji = TNamedResourceLink
export type TAvatar = TNamedResourceLink & TLayout

export type TChatResponse = {
  avatars: TAvatar[]
  dialogue: TDialogue[]
  emojies: TEmoji[]
}
