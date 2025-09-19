import type { Sprite, Text } from 'pixi.js'
import type { IFunctionSplitResult, ITextEmojiOptions } from '@/engine/scene/text.types'
import { TextStyle } from 'pixi.js'
import { AbstractSplitText } from '@/engine/scene/text.abstract'
import { textSplitWithEmojiReplacer } from '@/engine/scene/text.fn'

class TextEmoji extends AbstractSplitText<Text | Sprite> {

  /**
   * Default configuration options for TextEmoji instances.
   */
  public static defaultOptions: Partial<ITextEmojiOptions> = {
    autoSplit: true, // Auto-update on text/style changes
    lineAnchor: 0, // Top-left alignment
    wordAnchor: 0, // Top-left alignment
    charAnchor: 0, // Top-left alignment
  } as Partial<ITextEmojiOptions>

  constructor (config: ITextEmojiOptions) {
    const completeOptions: ITextEmojiOptions = {
      ...TextEmoji.defaultOptions,
      ...config,
    }

    super(completeOptions)
  }

  /**
   * Creates a TextEmoji instance from an existing text object.
   * Useful for converting standard Text or Text objects into segmented versions.
   * @param text - The source text object to convert
   * @param options - Additional splitting options
   * @returns A new TextEmoji instance
   * @example
   */
  public static from (text: Text, options?: Omit<ITextEmojiOptions, 'text' | 'style'>): TextEmoji {
    const completeOptions: ITextEmojiOptions = {
      ...TextEmoji.defaultOptions,
      ...options,
      text: text.text,
      style: new TextStyle(text.style),
    }

    return new TextEmoji({
      ...completeOptions,
    })
  }

  protected splitFn (): IFunctionSplitResult<Text | Sprite> {
    return textSplitWithEmojiReplacer({
      text: this._originalText,
      style: this._style,
      chars: this._canReuseChars ? this.chars : [],
    })
  }
}

export {
  TextEmoji,
}
