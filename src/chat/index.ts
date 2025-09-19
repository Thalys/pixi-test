import { fetchData, layoutScreen } from '@/app/features/chat'
import { createApp } from '@/chat/index.app'

export async function init () {
  const data = await fetchData()
  layoutScreen(data)
}

(async () => {

  await createApp()
  init()
})()
