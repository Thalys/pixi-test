import type { FancyButton } from '@pixi/ui'
import type { IAppScreenConstructor } from '@/engine/navigation.types'
import { anime } from '@/anime/anime'
import { PopupPause } from '@/app/popups/popup.pause'
import { PopupSettings } from '@/app/popups/popup.settings'
import { ScreenMain } from '@/app/screens/main/ScreenMain'
import textures from '@/app/textures'
import { engine } from '@/engine/engine.singleton'

export default new class {
  dismissPopup = () => {
    void engine().navigation.dismissPopup()
  }

  showScreen = (screen: IAppScreenConstructor) => { void engine().navigation.showScreen(screen) }

  goToPausePopup = () => { void engine().navigation.presentPopup(PopupPause) }

  goToSettings = () => { void engine().navigation.presentPopup(PopupSettings) }

  goToHome = () => { void engine().navigation.showScreen(ScreenMain) }

  goFullScreen = (btn: FancyButton) => {

    return async function toggleFullScreen () {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen()
        } else {
          await document.exitFullscreen()
        }

        await anime`fade-out`(btn).play()
        btn.defaultView = document.fullscreenElement ? textures.iconSmaller : textures.iconLarger
        await anime`fade-in`(btn).play()

      } catch (err) {
        console.error('FullScreen error:', err)
      }
    }
  }

  onButtonHoverSound = () => {
    engine().audio.sfx.play('main/sounds/sfx-hover.wav')
  }

  onBtnPressSound = () => {
    engine().audio.sfx.play('main/sounds/sfx-press.wav')
  }
}()
