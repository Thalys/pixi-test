import type { AppScreens, IAppScreen, TAssetBundleId } from '@/engine/navigation.types'
import { Container } from 'pixi.js'
import { anime } from '@/anime/anime'
import { Background } from '@/app/screens/loading/Background'
import { Logo } from '@/app/screens/loading/Logo'
import { ProgressBar } from '@/app/screens/loading/ProgressBar'

/** Screen shown while loading assets */
export class LoadScreen extends Container implements IAppScreen {
  public definition: AppScreens = 'LoadScreen'
  /** Assets bundles required by this screen */
  public static assetBundles = ['preload'] as TAssetBundleId[]
  /** The PixiJS logo */
  private logo: Logo
  /** Progress Bar */
  private progressBar: ProgressBar
  private bg: Background

  constructor () {
    super()
    this.label = 'ScreenAssetLoader'
    this.interactive = false
    this.interactiveChildren = false

    this.bg = new Background()
    this.addChild(this.bg)

    this.progressBar = new ProgressBar()
    this.addChild(this.progressBar)

    this.logo = new Logo()
    this.addChild(this.logo)
  }

  public onLoad (progress: number) {
    this.progressBar.set(progress)
  }

  /** Resize the screen, fired whenever window size changes  */
  public resize (width: number, height: number) {
    this.bg.resize(width, height)
    this.logo.resize(width, height)
    this.progressBar.resize(width, height)
  }

  /** Show screen with animations */
  public async show () {
    this.alpha = 1
  }

  /** Hide screen with animations */
  public async hide () {
    await anime`fade-out delay-2`(this).play()
  }
}
