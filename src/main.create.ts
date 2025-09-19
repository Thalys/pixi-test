import { initDevtools } from '@pixi/devtools'
import { Stats } from 'pixi-stats'
import { getAppVersion, isDev } from '@/app/global'
import { ZINC } from '@/app/utils/colors'
import { CreationEngine } from '@/engine/engine'
import { setEngine } from '@/engine/engine.singleton'
import { Measure } from '@/engine/scene/stage-ruler'
import { logger } from '@/tools/logger'
import '@/app/extra-modules'

export async function createApplication () {
  const engine = new CreationEngine()
  setEngine(engine)

  await engine.init({
    resizeOptions: { minWidth: 768, minHeight: 1024, letterbox: false },
    background: ZINC[900],
    antialias: true,
    hello: isDev(),
    powerPreference: 'high-performance',
  })

  initDevtools({ app: engine })
  const stats = new Stats(engine.renderer)

  if (isDev()) {
    logger.table(JSON.parse(JSON.stringify(import.meta.env)))
    logger.info(JSON.parse(JSON.stringify(`App version: \n${getAppVersion()}`)))
    engine.navigation.setMeasureLayer(Measure)
  }
}
