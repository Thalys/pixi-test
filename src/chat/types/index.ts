export type TNamedResourceLink = { name: string, url: string }
export type TAvatarLayout = { position: 'left' | 'right' }
export type TDialogue = { name: string, text: string }
export type TEmoji = TNamedResourceLink
export type TAvatar = TNamedResourceLink & TAvatarLayout

export type TChatResponse = {
  dialogue: TDialogue[]
  emojies: TEmoji[]
  avatars: TAvatar[]
}
