import type { Ticker } from 'pixi.js'
import type { AppScreens } from '@/engine/navigation.types'
import { ScreenBaseUI } from '@/app/screens/ScreenBaseUI'

/**
 * Magic Words
 *
 * Create a system that allows you to combine text and images like custom emojis
 * Use it to render a dialogue between characters with the data taken from this
 * endpoint: https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords
 */
export class Screen2 extends ScreenBaseUI {
  public override definition: AppScreens = 'Screen2'
  public override label: string = 'Screen2'
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
