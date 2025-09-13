import type { CreationEngine } from '@/engine/engine'
import type { AppScreen, AppScreenConstructor, AppScreens } from '@/engine/navigation/types'
import { Assets, BigPool, Container } from 'pixi.js'
import { ScreenMain } from '@/app/screens/main/ScreenMain'
import { Screen1 } from '@/app/screens/screen-1/Screen1'
import { Screen2 } from '@/app/screens/screen-2/Screen2'
import { Screen3 } from '@/app/screens/screen-3/Screen3'
import { userSettings } from '@/app/utils/user-settings'
import { Measure } from '@/engine/utils/measure-plane'

export class Navigation {
  /** Reference to the main application */
  public app!: CreationEngine

  /** Container for screens */
  public container = new Container()

  /** Application width */
  public width = 0

  /** Application height */
  public height = 0

  /** Constant background view for all screens */
  public background?: AppScreen

  /** Measurement overlay for development */
  public measureLayer?: AppScreen

  /** Current screen being displayed */
  public currentScreen?: AppScreen

  /** Current popup being displayed */
  public currentPopup?: AppScreen

  destroy () {
    window.removeEventListener('keydown', this._onKeyDown)
    window.removeEventListener('popstate', this._onPopState)
  }

  constructor () {
    window.addEventListener('keydown', this._onKeyDown)
    window.addEventListener('popstate', this._onPopState)
  }

  public init (app: CreationEngine) {
    this.app = app
    this.container.label = 'navigation'
  }

  /** Set the default background screen */
  public setBackground (ctor: AppScreenConstructor) {
    this.background = new ctor() // eslint-disable-line new-cap
    this.addAndShowScreen(this.background)
  }

  /** Set the measurement overlay layer */
  public setMeasureLayer (ctor: AppScreenConstructor) {
    this.measureLayer = new ctor() // eslint-disable-line new-cap
    this.addAndShowScreen(this.measureLayer)
  }

  /** Add screen to the stage, link update & resize functions */
  private async addAndShowScreen (screen: AppScreen) {
    // Add navigation container to stage if it does not have a parent yet
    if (!this.container.parent) {
      this.app.stage.addChild(this.container)
    }

    // Add screen to stage
    this.container.addChild(screen)

    // Setup things and pre-organise screen before showing
    if (screen.prepare) {
      screen.prepare()
    }

    // Add screen's resize handler, if available
    if (screen.resize) {
      // Trigger a first resize
      screen.resize(this.width, this.height)
    }

    // Add update function if available
    if (screen.update) {
      this.app.ticker.add(screen.update, screen)
    }

    // Show the new screen
    if (screen.show) {
      screen.interactiveChildren = false
      await screen.show()
      screen.interactiveChildren = true
    }
  }

  /** Remove screen from the stage, unlink update & resize functions */
  private async hideAndRemoveScreen (screen: AppScreen) {
    // Prevent interaction in the screen
    screen.interactiveChildren = false

    // Hide screen if method is available
    if (screen.hide) {
      await screen.hide()
    }

    // Unlink update function if method is available
    if (screen.update) {
      this.app.ticker.remove(screen.update, screen)
    }

    // Remove screen from its parent (usually app.stage, if not changed)
    if (screen.parent) {
      screen.parent.removeChild(screen)
    }

    // Clean up the screen so that instance can be reused again later
    if (screen.reset) {
      screen.reset()
    }
  }

  /**
   * Hide current screen (if there is one) and present a new screen.
   * Any class that matches AppScreen interface can be used here.
   */
  public async showScreen (ctor: AppScreenConstructor) {
    // Block interactivity in current screen
    if (this.currentScreen) {
      this.currentScreen.interactiveChildren = false
    }

    // Load assets for the new screen, if available
    if (ctor.assetBundles) {
      // Load all assets required by this new screen
      await Assets.loadBundle(ctor.assetBundles, (progress) => {
        if (this.currentScreen?.onLoad) {
          this.currentScreen.onLoad(progress * 100)
        }
      })
    }

    if (this.currentScreen?.onLoad) {
      this.currentScreen.onLoad(100)
    }

    // If there is a screen already created, hide and destroy it
    if (this.currentScreen) {
      await this.hideAndRemoveScreen(this.currentScreen)
    }

    // Create the new screen and add that to the stage
    this.currentScreen = BigPool.get(ctor)
    await this.addAndShowScreen(this.currentScreen)

    const ref = this.crossReference(this.currentScreen.definition)
    if (ref === null) {
      return
    }
    userSettings.setLastScreen(ref)
    this.stackScreenState(ref)
  }

  /**
   * Resize screens
   * @param width Viewport width
   * @param height Viewport height
   */
  public resize (width: number, height: number) {
    this.width = width
    this.height = height
    this.currentScreen?.resize?.(width, height)
    this.currentPopup?.resize?.(width, height)
    this.background?.resize?.(width, height)
    this.measureLayer?.resize?.(width, height)
  }

  /**
   * Show up a popup over current screen
   */
  public async presentPopup (ctor: AppScreenConstructor) {
    if (this.currentScreen) {
      this.currentScreen.interactiveChildren = false
      await this.currentScreen.pause?.()
    }

    if (this.currentPopup) {
      await this.hideAndRemoveScreen(this.currentPopup)
    }

    this.currentPopup = new ctor() // eslint-disable-line new-cap
    await this.addAndShowScreen(this.currentPopup)
  }

  /**
   * Dismiss current popup, if there is one
   */
  public async dismissPopup () {
    if (!this.currentPopup) return
    const popup = this.currentPopup
    this.currentPopup = undefined
    await this.hideAndRemoveScreen(popup)
    if (this.currentScreen) {
      this.currentScreen.interactiveChildren = true
      this.currentScreen.resume?.()
    }
  }

  /**
   * Blur screens when lose focus
   */
  public blur () {
    this.currentScreen?.blur?.()
    this.currentPopup?.blur?.()
    this.background?.blur?.()
    this.measureLayer?.blur?.()
  }

  /**
   * Focus screens
   */
  public focus () {
    this.currentScreen?.focus?.()
    this.currentPopup?.focus?.()
    this.background?.focus?.()
    this.measureLayer?.focus?.()
  }

  stackScreenState (value: AppScreens) {
    history.pushState({ page: value }, value)
  }

  private _onKeyDown = (e: KeyboardEvent) => {
    // console.log(`key pressed: [ ${e.key} ]`)
    if (e.key === 'Escape') {
      // console.log('Emitting "goBack" signal.')
      this._onPopState()
    }
  }

  private _onPopState = (e?: PopStateEvent) => {
    e?.preventDefault()
    // This fires when the user hits the browser/Android back button.
    // console.log('Back button pressed. Emitting "goBack" signal.')
    this.showScreen(ScreenMain)
  }

  private crossReference = (screen: AppScreens): AppScreens | null => {
    switch (screen) {
      case 'Screen1':
        return 'Screen1'
      case 'Screen2':
        return 'Screen2'
      case 'Screen3':
        return 'Screen3'
      case 'Measure':
      case 'LoadScreen':
        return null // don't save for loading screen
      case 'PausePopup':
      case 'SettingsPopup':
      case 'ScreenMain':
      default:
        return 'ScreenMain'
    }
  }

  private matchRefScreen = (screen: AppScreens): AppScreenConstructor | null => {
    switch (screen) {
      case 'Screen1':
        return Screen1
      case 'Screen2':
        return Screen2
      case 'Screen3':
        return Screen3
      case 'Measure':
      case 'LoadScreen':
        return null // don't save for loading screen
      case 'PausePopup':
      case 'SettingsPopup':
      case 'ScreenMain':
      default:
        return ScreenMain
    }
  }

  public showLastSessionScreen = async () => {
    const lastScreen: AppScreens = userSettings.getLastScreen()
    const ref = this.crossReference(lastScreen)
    if (!ref) {
      await this.showScreen(ScreenMain)
      return
    }
    await this.showScreen(this.matchRefScreen(ref) || ScreenMain)
  }

  /**
   * Toggle the measurement overlay visibility
   */
  public toggleMeasureLayer () {
    if (this.measureLayer && 'toggle' in this.measureLayer) {
      ;(this.measureLayer as Measure).toggle()
    }
  }

  /**
   * Initialize the measurement layer for development
   */
  public initMeasureLayer () {
    if (!this.measureLayer) {
      this.setMeasureLayer(Measure as unknown as AppScreenConstructor)
    }
  }
}
