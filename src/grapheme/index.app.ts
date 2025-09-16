import { initDevtools } from '@pixi/devtools'
import { Assets } from 'pixi.js'
import { getAppVersion } from '@/app/global'
import { CreationEngine } from '@/engine/engine'
import { setEngine } from '@/engine/engine.singleton'
import { Measure } from '@/engine/utils/stage-ruler'
import { logger } from '@/tools/logger'

export async function createApp () {
  const engine = new CreationEngine()
  setEngine(engine)

  // Initialize the creation engine instance
  await engine.init({
    background: '#18181b',
    resizeOptions: { minWidth: 700, minHeight: 650, letterbox: false },
  })

  if (import.meta.env.DEV) {
    logger.table(JSON.parse(JSON.stringify(import.meta.env)))
    logger.info(JSON.parse(JSON.stringify(`App version: \n${getAppVersion()}`)))
    engine.navigation.setMeasureLayer(Measure)
  }

  await Assets.loadBundle('test')

  initDevtools({ app: engine })

  return engine
}
