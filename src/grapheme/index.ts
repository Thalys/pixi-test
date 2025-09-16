import { Text, TextStyle } from 'pixi.js'
import { engine } from '@/engine/engine.singleton'
import { createApp } from '@/grapheme/index.app'
import { createBasic, createBasicMonospace, createRichText, createTextSkew } from '@/grapheme/index.elements'

(async () => {

  await createApp()

  const { stage, screen } = engine()

  const textBasic = createBasic()

  const textMonospace = createBasicMonospace()

})()
