import type { Texture } from 'pixi.js'
import type { TNamedResourceLink } from '@/app/features/chat/index.types'
import { Assets } from 'pixi.js'

export async function loadExternalTextures (data: TNamedResourceLink[]) {
  const promises = data.map(
    async ({ name, url }): Promise<Texture> => {
      const assetData = { alias: name, src: url, parser: 'texture' }
      return Assets.load<Texture>(assetData)
    },
  )

  await Promise.allSettled(promises)
}
