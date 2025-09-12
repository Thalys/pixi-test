import type { Container, Ticker } from 'pixi.js'

export const appScreens = [
  'LoadScreen',

  'ScreenMain',
  'Screen1',
  'Screen2',
  'Screen3',

  'SettingsPopup',
  'PausePopup',

  'Measure',
] as const

export type AppScreens = typeof appScreens[number]

/** Interface for app screens */
export interface AppScreen extends Container {
  definition: AppScreens
  /** Show the screen */
  show?: () => Promise<void>
  /** Hide the screen */
  hide?: () => Promise<void>
  /** Pause the screen */
  pause?: () => Promise<void>
  /** Resume the screen */
  resume?: () => Promise<void>
  /** Prepare screen, before showing */
  prepare?: () => void
  /** Reset screen, after hidden */
  reset?: () => void
  /** Update the screen, passing delta time/step */
  update?: (time: Ticker) => void
  /** Resize the screen */
  resize?: (width: number, height: number) => void
  /** Blur the screen */
  blur?: () => void
  /** Focus the screen */
  focus?: () => void
  /** Method to react on assets loading progress */
  onLoad?: (progress: number) => void
}

/** Interface for app screens constructors */
export interface AppScreenConstructor {
  new (): AppScreen
  /** List of assets bundles required by the screen */
  assetBundles?: string[]
}
