import { initDevtools } from '@pixi/devtools'
import { getAppVersion } from '@/app/global'
import { LoadScreen } from '@/app/screens/loading/ScreenLoad'
import { userSettings } from '@/app/utils/user.settings'
import { CreationEngine } from '@/engine/engine'
import { setEngine } from '@/engine/engine.singleton'
import { Measure } from '@/engine/utils/stage-ruler'
import { logger } from '@/tools/logger'
import '@/app/extra-modules'

(async () => {
  const engine = new CreationEngine()
  setEngine(engine)

  await engine.init({
    background: '#1E1E1E',
    resizeOptions: { minWidth: 768, minHeight: 1024, letterbox: false },
  })

  if (import.meta.env.DEV) {
    logger.table(JSON.parse(JSON.stringify(import.meta.env)))
    logger.info(JSON.parse(JSON.stringify(`App version: \n${getAppVersion()}`)))
    engine.navigation.setMeasureLayer(Measure)
  }

  initDevtools({ app: engine })

  // Initialize the user settings
  userSettings.init()

  await engine.navigation.showScreen(LoadScreen)
  await engine.navigation.showLastSessionScreen()
})()
