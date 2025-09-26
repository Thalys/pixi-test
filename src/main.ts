import { fetchData } from '@/app/features/chat'
import { LoadScreen } from '@/app/screens/loading/ScreenLoad'
import { ScreenMain } from '@/app/screens/main/ScreenMain'
import { OverlayUI } from '@/app/screens/overlay/UI'
import { userSettings } from '@/app/utils/user.settings'
import { engine } from '@/engine/engine.singleton'
import { createApplication } from '@/main.create'

(async () => {
  await createApplication()

  // Initialize the user settings
  userSettings.init()

  // Pre-fetching data
  fetchData()

  const { navigation } = engine()
  await navigation.showScreen(LoadScreen)
  await navigation.showScreen(ScreenMain)
  navigation.setOverlay(OverlayUI)
})()
