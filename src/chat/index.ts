import { init } from '@/app/features/chat'
import { createApp } from '@/chat/index.app'

(async () => {

  await createApp()
  init()
})()
