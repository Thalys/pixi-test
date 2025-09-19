import type { Container } from 'pixi.js'
import type { AppScreens } from '@/engine/navigation.types'
import { fetchData, layoutScreen } from '@/app/features/chat'
import { ScreenBaseUI } from '@/app/screens/ScreenBaseUI'
import { engine } from '@/engine/engine.singleton'

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
  public _chatContainer: Container | null = null
  /** Assets bundles required by this screen */
  public static override assetBundles = ['main']

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

  public override resize (width: number, height: number): void {
    if (!this._chatContainer) return

    this._chatContainer.y = 75
    this._chatContainer.x = width / 2 - this._chatContainer.getSize().width / 2
  }

  /** Show screen with animations */
  public override async show (): Promise<void> {

  }

  public override async hide () {}
}
