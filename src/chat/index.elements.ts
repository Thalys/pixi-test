import type { TextString, TextStyleOptions } from 'pixi.js'
import { Color, FillGradient, Text, TextStyle } from 'pixi.js'
import { engine } from '@/engine/engine.singleton'

export function createBasic () {
  const { stage, screen } = engine()
  const text: TextString = 'Hello `Grapheme`!'
  const style: TextStyleOptions = { fontSize: 18, fill: 0xFFFFFF }
  const label = new Text({ text, style })
  label.x = screen.width * 0.5
  label.y = 75
  label.anchor = 0.5
  stage.addChild(label)

  return label
}

export function createBasicMonospace () {
  const { stage, screen } = engine()
  const text: TextString = 'import { Text } from \'@/grapheme\''
  const style: TextStyleOptions = {
    fontSize: 18,
    fill: 0xFFFFFF,
    fontFamily: 'monospace',
  }
  const label = new Text({ text, style })
  label.x = screen.width * 0.5
  label.y = 110
  label.anchor = 0.5
  stage.addChild(label)

  return label
}

export function createRichText () {
  const { stage, screen } = engine()
  const fill = new FillGradient({ type: 'linear' })
  const colors = [0xFFFFFF, 0x00FF99].map(color => Color.shared.setValue(color).toNumber())
  colors.forEach((number, index) => {
    const ratio = index / colors.length
    fill.addColorStop(ratio, number)
  })
  const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: { fill },
    stroke: { color: '#4a1850', width: 5, join: 'round' },
    dropShadow: {
      color: '#000000',
      blur: 4,
      angle: Math.PI / 6,
      distance: 6,
    },
    wordWrap: true,
    wordWrapWidth: 440,
  })

  const richText = new Text({
    text: 'Rich text with a lot of options and across multiple lines',
    style,
  })

  richText.x = 50
  richText.y = 220

  stage.addChild(richText)
  return richText
}

export function createTextSkew () {
  const { stage, screen } = engine()
  const skewStyle = new TextStyle({
    fontFamily: 'Arial',
    dropShadow: {
      alpha: 0.8,
      angle: 2.1,
      blur: 4,
      color: '0x111111',
      distance: 10,
    },
    fill: '#ffffff',
    stroke: { color: '#004620', width: 12, join: 'round' },
    fontSize: 60,
    fontWeight: 'lighter',
  })

  const skewText = new Text({
    text: 'SKEW IS COOL',
    style: skewStyle,
  })

  skewText.skew.set(0.65, -0.3)
  skewText.anchor.set(0.5, 0.5)
  skewText.x = 300
  skewText.y = 480

  stage.addChild(skewText)
  return skewText
}
