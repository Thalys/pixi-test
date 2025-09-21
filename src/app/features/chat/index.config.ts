import type { TAvatar } from '@/app/features/chat/index.types'
import { TextStyle } from 'pixi.js'
import { ZINC } from '@/app/utils/colors'
import { TextEmoji } from '@/engine/scene/text'

export const API_URL = 'https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords' as const

export const AvatarUnknown: TAvatar = { name: 'unknown', url: 'unknown', position: 'right' } as const

TextEmoji.defaultOptions.autoSplit = true
TextEmoji.defaultOptions.charAnchor = 0
TextEmoji.defaultOptions.lineAnchor = 0
TextEmoji.defaultOptions.style = new TextStyle({ fontSize: 16, fill: ZINC[300] })
TextEmoji.defaultOptions.text = ''
TextEmoji.defaultOptions.wordAnchor = 0
