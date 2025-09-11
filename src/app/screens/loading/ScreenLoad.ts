import type { ObjectTarget } from 'motion/react'
import type { AppScreens } from '@/engine/navigation/types'
import { animate } from 'motion'
import { Container } from 'pixi.js'
import { Background } from '@/app/screens/loading/Background'
import { Logo } from '@/app/screens/loading/Logo'
import { ProgressBar } from '@/app/screens/loading/ProgressBar'

/** Screen shown while loading assets */
export class LoadScreen extends Container {
  public definition: AppScreens = 'LoadScreen'
  /** Assets bundles required by this screen */
  public static assetBundles = ['preload']
  /** The PixiJS logo */
  private logo: Logo
  /** Progress Bar */
  private progressBar: ProgressBar
  private background: Background

  constructor () {
    super()
    this.label = 'ScreenAssetLoader'

    this.background = new Background()
    this.addChild(this.background)

    this.progressBar = new ProgressBar()
    this.addChild(this.progressBar)

    this.logo = new Logo()
    this.addChild(this.logo)
  }

  public onLoad (progress: number) {
    console.log('progress', progress) // eslint-disable-line no-console
    this.progressBar.set(progress)
  }

  /** Resize the screen, fired whenever window size changes  */
  public resize (width: number, height: number) {
    this.logo.resize(width, height)
    this.progressBar.resize(width, height)
    this.background.resize(width, height)
  }

  /** Show screen with animations */
  public async show () {
    this.alpha = 1
  }

  /** Hide screen with animations */
  public async hide () {
    await animate(this, { alpha: 0 } as ObjectTarget<this>, {
      duration: 0.3,
      ease: 'linear',
      delay: 1,
    })
  }
}
