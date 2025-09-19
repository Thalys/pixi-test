import { LoadScreen } from '@/app/screens/loading/ScreenLoad'
import { userSettings } from '@/app/utils/user.settings'
import { engine } from '@/engine/engine.singleton'
import { createApplication } from '@/main.create'

(async () => {
  await createApplication()

  // Initialize the user settings
  userSettings.init()

  const { navigation } = engine()
  await navigation.showScreen(LoadScreen)
  await navigation.showLastSessionScreen()
})()
