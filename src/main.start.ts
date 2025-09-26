import { fetchData } from '@/app/features/chat'
import { isDev } from '@/app/global'
import { LoadScreen } from '@/app/screens/loading/ScreenLoad'
import { ScreenMain } from '@/app/screens/main/ScreenMain'
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

  if (isDev()) {
    await navigation.showLastSessionScreen()
  } else {
    await navigation.showScreen(ScreenMain)
  }
})()
