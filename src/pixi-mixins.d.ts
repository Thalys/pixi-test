import type {
  ResizePluginOptions,
} from 'pixi.js'
import type { BGM, SFX } from '@/engine/audio'
import type { Navigation } from '@/engine/navigation'

// Custom utility type:
export type DeepRequired<T> = Required<{
  [K in keyof T]: DeepRequired<T[K]>
}>

/**
 * Application options for the CreationResizePlugin.
 */
export interface CreationResizePluginOptions extends ResizePluginOptions {
  /** Options for controlling the resizing of the application */
  resizeOptions?: {
    /** Minimum width of the application */
    minWidth?: number
    /** Minimum height of the application */
    minHeight?: number
    /** Whether to letterbox the application when resizing */
    letterbox?: boolean
  }
}

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
