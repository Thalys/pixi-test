import type { TextStyleOptions } from 'pixi.js'
import { Text, TextStyle } from 'pixi.js'
import { zinc } from '@/app/utils/colors'

export async function createText (message: string) {

  const options: TextStyleOptions = {
    fontSize: 18,
    fill: zinc[400],
    // stroke: { color: '#db48ebff', width: 5, join: 'round' },
    // dropShadow: {
    //   color: zinc[700],
    //   blur: 2,
    //   angle: 45 * DEG_TO_RAD,
    //   distance: 2,
    // },
    // wordWrap: true,
    // wordWrapWidth: 440,
  }

  const style = new TextStyle(options)
  const text = new Text({ text: message, style })
  return text
}
