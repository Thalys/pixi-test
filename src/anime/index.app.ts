import { Stats } from 'pixi-stats'
import { Assets } from 'pixi.js'
import { getAppVersion } from '@/app/global'
import { ZINC } from '@/app/utils/colors'
import { CreationEngine } from '@/engine/engine'
import { setEngine } from '@/engine/engine.singleton'
import { Ruler } from '@/engine/scene/stage-ruler'
import { logger } from '@/tools/logger'

export async function createApp () {
  const engine = new CreationEngine()
  setEngine(engine)

  // Initialize the creation engine instance
  await engine.init({
    background: ZINC[900],
    resizeOptions: { minWidth: 800, minHeight: 600, letterbox: false },
  })

  if (import.meta.env.DEV) {
    logger.table(JSON.parse(JSON.stringify(import.meta.env)))
    logger.info(JSON.parse(JSON.stringify(`App version: \n${getAppVersion()}`)))
    engine.navigation.setRulerLayer(Ruler)
    const stats = new Stats(engine.renderer)
    document.body.appendChild(stats.domElement)
  }

  await Promise.all([
    Assets.loadBundle('test'),
    Assets.loadBundle('fire'),
    Assets.loadBundle('main'),
    Assets.loadBundle('ace_of_shadows'),
  ])

  return engine
}
