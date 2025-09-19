import type { TConsole } from '@/tools/types'
import { Assets, Container } from 'pixi.js'
import { createApp } from '@/chat/index.app'
import { fxDOOMFire } from '@/fire/doom'
import { entriesOf } from '@/lib/object'
import { bold, cyan, logger } from '@/tools/logger'

const logAssetsCache = (...rest: Parameters<TConsole['debug']>) => {
  logger.log(`[${bold(cyan('Assets.cache.keys()'))}]`, entriesOf(Assets.cache))
}

export async function main () {

  const { stage, screen } = await createApp()
  await Assets.loadBundle('test')
  await Assets.loadBundle('fire')

  const container = new Container()
  stage.addChild(container)
  container.alpha = 0.7
  container.pivot = 0.5
  container.x = 75
  container.y = 75

  logAssetsCache()

  fxDOOMFire(container)
}

main()
