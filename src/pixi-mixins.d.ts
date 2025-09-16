import type { BGM, SFX } from '@/engine/audio'
import type { Navigation } from '@/engine/navigation'
import type {
  CreationResizePluginOptions,
  DeepRequired,
} from '@/engine/resize.plugin'

declare global {
  namespace PixiMixins {
    interface Application extends DeepRequired<CreationResizePluginOptions> {
      audio: {
        bgm: BGM
        sfx: SFX
        getMasterVolume: () => number
        setMasterVolume: (volume: number) => void
      }
      navigation: Navigation
    }
    interface ApplicationOptions extends CreationResizePluginOptions {}
  }
}

export {}
