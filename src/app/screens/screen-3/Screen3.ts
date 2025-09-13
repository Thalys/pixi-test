import type { Ticker } from 'pixi.js'
import type { AppScreens } from '@/engine/navigation/navigation.types'
import { ScreenBaseUI } from '@/app/screens/ScreenBaseUI'

/**
 * Screen with the first assignment
 */
export class Screen3 extends ScreenBaseUI {
  public override definition: AppScreens = 'Screen3'
  /** Assets bundles required by this screen */
  public static override assetBundles = ['main']

  constructor () { super() }

  /** Prepare the screen just before showing */
  public override prepare () {}

  /** Update the screen */
  public override update (time: Ticker) {}

  /** Fully reset */
  public override reset () {}

  /** Resize the screen, fired whenever window size changes */
  public override resize (width: number, height: number) {
    super.resize(width, height)
  }

  /** Show screen with animations */
  public override async show (): Promise<void> {}

  public override async hide () {}
}
