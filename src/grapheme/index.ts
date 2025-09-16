import { createApp } from '@/grapheme/index.app'
import { createBasic, createBasicMonospace } from '@/grapheme/index.elements'

(async () => {

  await createApp()

  const textBasic = createBasic()

  const textMonospace = createBasicMonospace()

})()
