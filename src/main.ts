import { initDevtools } from '@pixi/devtools'
import { setEngine } from '@/app/engine-singleton'
import { SettingsPopup } from '@/app/popups/SettingsPopup'
import { LoadScreen } from '@/app/screens/loading/ScreenLoad'
import { userSettings } from '@/app/utils/user-settings'
import { CreationEngine } from '@/engine/engine'
import { Measure } from '@/engine/utils/stage-ruler'
import { logger } from '@/tools/logger'
import '@/app/extra-modules'

(async () => {
  // Create a new creation engine instance
  const engine = new CreationEngine()
  setEngine(engine)

  logger.table(JSON.parse(JSON.stringify(import.meta.env)))
  logger.info(JSON.parse(JSON.stringify(`App version: \n${window.__PIXI_TEST_VERSION__}`)))

  // Initialize the creation engine instance
  await engine.init({
    background: '#1E1E1E',
    resizeOptions: { minWidth: 768, minHeight: 1024, letterbox: false },
  })

  if (import.meta.env.DEV) {
    engine.navigation.setMeasureLayer(Measure)
  }

  initDevtools({ app: engine })

  // Initialize the user settings
  userSettings.init()

  await engine.navigation.showScreen(LoadScreen)
  await engine.navigation.showLastSessionScreen()
  await engine.navigation.presentPopup(SettingsPopup)
})()
