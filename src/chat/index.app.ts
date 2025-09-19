import { initDevtools } from '@pixi/devtools'
import { ZINC } from '@/app/utils/colors'
import { CreationEngine } from '@/engine/engine'
import { setEngine } from '@/engine/engine.singleton'
import { Measure } from '@/engine/utils/stage-ruler'

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
    engine.navigation.setMeasureLayer(Measure)
  }

  return engine
}
