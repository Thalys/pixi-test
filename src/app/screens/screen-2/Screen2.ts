import type { AppScreens, IAppScreen, TAssetBundleId } from '@/engine/navigation.types'
import { Container } from 'pixi.js'
import { fetchData, layoutScreen } from '@/app/features/chat'
import { engine } from '@/engine/engine.singleton'

/**
 * Magic Words
 *
 * Create a system that allows you to combine text and images like custom emojis
 * Use it to render a dialogue between characters with the data taken from this
 * endpoint: https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords
 */
export class Screen2 extends Container implements IAppScreen {
  public definition: AppScreens = 'Screen2'
  public override label: string = 'Screen2'
  public _chatContainer: Container | null = null
  public static assetBundles = ['main'] as TAssetBundleId[]

  constructor () {
    super()

    // Start the data fetching
    fetchData()
      .then((data) => {
        layoutScreen(data).then((container) => {
          this._chatContainer = container
          this.addChild(this._chatContainer)

          const { width, height } = engine().screen
          this.resize(width, height)
        })
      })

  }

  public resize (width: number, height: number): void {
    if (!this._chatContainer) return

    this._chatContainer.y = 75
    this._chatContainer.x = width / 2 - this._chatContainer.getSize().width / 2
  }
}
