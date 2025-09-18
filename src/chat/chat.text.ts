import type { Sprite } from 'pixi.js'
import { SplitText, Text, TextStyle } from 'pixi.js'
import { ZINC } from '@/app/utils/colors'
import { fetchEmoji } from '@/chat/chat.image'
import { textSplitWithEmojiReplacer } from '@/engine/utils/canvasTextSplit'
import { logger } from '@/tools/logger'

const style = new TextStyle({
  fontSize: 18,
  fill: ZINC[400],
})

export async function createText (message: string) {
  const text = new Text({ text: message, style })
  return text
}

export class EmojiSplitText extends SplitText {

  override chars: (Text | Sprite)[] = []

  constructor (config: ConstructorParameters<typeof SplitText>[0]) {
    super(config)
  }

  override split (): void {
    const res = textSplitWithEmojiReplacer({
      text: this._originalText,
      style: this._style,
      chars: this._canReuseChars ? this.chars : [],
    })

    this.chars = res.chars
    this.words = res.words
    this.lines = res.lines

    logger.debug(this.words)

    this.addChild(...this.lines)

    // force origin to be set
    this.charAnchor = this._charAnchor
    this.wordAnchor = this._wordAnchor
    this.lineAnchor = this._lineAnchor

    this._dirty = false
    this._canReuseChars = true
  }
}

export async function parse (message: string) {
  // const container = new Container()
  // let x = 0

  const emojis = message.split(/\s/).map(
    (word) => {
      if (word[0] === '{' && word.at(-1) === '}') {
        return word.slice(1, -1)
      }
      return false
    },
  ).filter(Boolean)

  for (const emoji of emojis) {
    await fetchEmoji(emoji)
  }

  const text = new EmojiSplitText({
    text: message,
    style,
    autoSplit: true,
  })

  return text
}
