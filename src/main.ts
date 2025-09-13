import { initDevtools } from '@pixi/devtools'
import { setEngine } from '@/app/engine-singleton'
import { LoadScreen } from '@/app/screens/loading/ScreenLoad'
import { userSettings } from '@/app/utils/user-settings'
import { CreationEngine } from '@/engine/engine'
import { Measure } from '@/engine/utils/measure-plane'
import { logger } from '@/tools/logger'
import '@/app/extra-modules'

// Create a new creation engine instance
const engine = new CreationEngine()
setEngine(engine);

(async () => {
  // Initialize the creation engine instance
  await engine.init({
    background: '#1E1E1E',
    resizeOptions: { minWidth: 768, minHeight: 1024, letterbox: false },
  })

  logger.table(JSON.parse(JSON.stringify(import.meta.env)))

  if (import.meta.env.MODE !== 'production') {
    engine.navigation.setMeasureLayer(Measure)
  }

  initDevtools({ app: engine })

  // Initialize the user settings
  userSettings.init()

  await engine.navigation.showScreen(LoadScreen)
  await engine.navigation.showLastSessionScreen()
})()
