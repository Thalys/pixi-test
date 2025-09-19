import { createApp } from '@/chat/index.app'
import { init } from '@/chat/index.chat'

(async () => {

  await createApp()
  init()
})()
