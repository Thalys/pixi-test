import type { Screens } from '@/app/screens/types'
import { setEngine } from '@/app/engine-singleton'
import { LoadScreen } from '@/app/screens/loading/ScreenLoad'
import { MainScreen } from '@/app/screens/main/ScreenMain'
import { Screen1 } from '@/app/screens/screen-1/Screen1'
import { Screen2 } from '@/app/screens/screen-2/Screen2'

import { Screen3 } from '@/app/screens/screen-3/Screen3'
import { userSettings } from '@/app/utils/user-settings'
import { CreationEngine } from '@/engine/engine'
/**
 * Importing these modules will automatically register there plugins with the engine.
 */
import '@pixi/sound'
// import "@esotericsoftware/spine-pixi-v8";

// Create a new creation engine instance
const engine = new CreationEngine()
setEngine(engine);

(async () => {
  // Initialize the creation engine instance
  await engine.init({
    background: '#1E1E1E',
    resizeOptions: { minWidth: 768, minHeight: 1024, letterbox: false },
  })

  // Initialize the user settings
  userSettings.init()

  // Show the load screen
  await engine.navigation.showScreen(LoadScreen)

  const lastScreen: Screens = userSettings.getLastScreen()
  switch (lastScreen) {
    case 'Screen1':
      await engine.navigation.showScreen(Screen1)
      break
    case 'Screen2':
      await engine.navigation.showScreen(Screen2)
      break
    case 'Screen3':
      await engine.navigation.showScreen(Screen3)
      break
    case 'Main':
    default:
      await engine.navigation.showScreen(MainScreen)
  }

})()
