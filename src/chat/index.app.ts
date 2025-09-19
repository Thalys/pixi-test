import { initDevtools } from '@pixi/devtools'
import { ZINC } from '@/app/utils/colors'
import { CreationEngine } from '@/engine/engine'
import { setEngine } from '@/engine/engine.singleton'
import { Measure } from '@/engine/utils/stage-ruler'

// const _log = logger.custom('src/chat/index.app.ts')
// const log = (...args: Parameters<typeof _log>) => _log('\n   ', ...args)

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
  initDevtools({ app: engine })

  if (import.meta.env.DEV) {
    // logger.table(JSON.parse(JSON.stringify(import.meta.env)))
    // logger.info(JSON.parse(JSON.stringify(`App version: \n${getAppVersion()}`)))
    engine.navigation.setMeasureLayer(Measure)

    // const { renderer } = engine
    // const width = renderer.width
    // const height = renderer.height
    // const pixelRatio = globalThis.window.devicePixelRatio
    // renderer.on('resize', () => {
    //   log(`\n   w:${width}\n   h:${height}\n   devicePixelRatio: ${pixelRatio}`)
    // })
    // log(`\n   w:${width}\n   h:${height}\n   devicePixelRatio: ${pixelRatio}`)
  }

  return engine
}
