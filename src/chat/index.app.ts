import { initDevtools } from '@pixi/devtools'
import { getAppVersion } from '@/app/global'
import { ZINC } from '@/app/utils/colors'
import { CreationEngine } from '@/engine/engine'
import { setEngine } from '@/engine/engine.singleton'
import { Measure } from '@/engine/utils/stage-ruler'
import { logger } from '@/tools/logger'

const log = logger.custom('src/chat/index.app.ts')

export async function createApp () {
  const engine = new CreationEngine()
  setEngine(engine)

  // Initialize the creation engine instance
  await engine.init({
    background: ZINC[900],
    resizeOptions: { minWidth: 800, minHeight: 600, letterbox: false },
    antialias: true,
    hello: true,
    powerPreference: 'high-performance',
    resolution: globalThis.window.devicePixelRatio,
  })

  if (import.meta.env.DEV) {
    logger.table(JSON.parse(JSON.stringify(import.meta.env)))
    logger.info(JSON.parse(JSON.stringify(`App version: \n${getAppVersion()}`)))
    engine.navigation.setMeasureLayer(Measure)

    const { renderer } = engine
    const width = renderer.width
    const height = renderer.height
    const pixelRatio = globalThis.window.devicePixelRatio
    renderer.on('resize', () => {
      log('\n', `${width}x${height} devicePixelRatio: ${pixelRatio}`)
    })
    log('\n', `${width}x${height} devicePixelRatio: ${pixelRatio}`)
  }

  initDevtools({ app: engine })

  return engine
}
