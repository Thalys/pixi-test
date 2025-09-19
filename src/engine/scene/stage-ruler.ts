import type { Ticker } from 'pixi.js'
import type { IAppScreen } from '@/engine/navigation.types'
import type { MeasureOptions } from '@/engine/scene/stage-ruler.types'
import { Container, Graphics, Text, TextStyle } from 'pixi.js'

let _options: MeasureOptions = {
  majorTick: 100,
  minorTick: 50,
  microTick: 10,
  showLabels: true,
  showCrosshair: true,
  rulerColor: 0xFFFFFF,
  labelColor: 0xFFFFFF,
  backgroundColor: 0x000000,
}

export class Measure extends Container implements IAppScreen {

  public override label = 'Measure'
  public definition = 'Measure' as const

  private rulers: Graphics = new Graphics()
  private labels: Container = new Container()
  private crosshair: Graphics = new Graphics()

  constructor (options?: Partial<MeasureOptions>) {
    super()

    if (options) {
      _options = { ..._options, ...options }
    }

    this.addChild(this.rulers)
    this.addChild(this.labels)
    this.addChild(this.crosshair)

    this.x = 0
    this.y = 0
    this.alpha = 0.8
    this.visible = false
  }

  /**
   * Creates ruler-style measurement guides with ticks and labels
   */
  buildRulers (w: number, h: number) {
    const { showCrosshair } = _options

    // Clear existing graphics
    this.rulers.clear()
    this.crosshair.clear()
    this.labels.removeChildren()

    // Ruler background strips
    this.rulers.rect(0, 0, w, 30).fill({ color: _options.backgroundColor, alpha: 0.7 })
    this.rulers.rect(0, 0, 30, h).fill({ color: _options.backgroundColor, alpha: 0.7 })

    // Horizontal ruler (top)
    this.buildHorizontalRuler(w)

    // Vertical ruler (left)
    this.buildVerticalRuler(h)

    // Optional crosshair at center
    if (showCrosshair) {
      this.buildCrosshair(w, h)
    }
  }

  private buildHorizontalRuler (width: number) {
    const { majorTick, minorTick, microTick, showLabels } = _options

    for (let x = 0; x <= width; x += microTick) {
      let tickHeight = 5
      let strokeWidth = 1

      if (x % majorTick === 0) {
        // Major tick
        tickHeight = 20
        strokeWidth = 2

        if (showLabels && x > 0) {
          this.addLabel(x.toString(), x, 25, 'center')
        }
      } else if (x % minorTick === 0) {
        // Minor tick
        tickHeight = 12
        strokeWidth = 1
      }

      this.rulers.moveTo(x, 30 - tickHeight)
        .lineTo(x, 30)
        .stroke({ color: _options.rulerColor, width: strokeWidth })
    }

    // Ruler border
    this.rulers.moveTo(0, 30).lineTo(width, 30).stroke({ color: _options.rulerColor, width: 2 })
  }

  private buildVerticalRuler (height: number) {
    const { majorTick, minorTick, microTick, showLabels } = _options

    for (let y = 0; y <= height; y += microTick) {
      let tickWidth = 5
      let strokeWidth = 1

      if (y % majorTick === 0) {
        // Major tick
        tickWidth = 20
        strokeWidth = 2

        if (showLabels && y > 0) {
          this.addLabel(y.toString(), 25, y, 'center')
        }
      } else if (y % minorTick === 0) {
        // Minor tick
        tickWidth = 12
        strokeWidth = 1
      }

      this.rulers.moveTo(30 - tickWidth, y)
        .lineTo(30, y)
        .stroke({ color: _options.rulerColor, width: strokeWidth })
    }

    // Ruler border
    this.rulers.moveTo(30, 0).lineTo(30, height).stroke({ color: _options.rulerColor, width: 2 })
  }

  private buildCrosshair (width: number, height: number) {
    const centerX = width / 2
    const centerY = height / 2

    // Horizontal crosshair line
    this.crosshair.moveTo(30, centerY).lineTo(width, centerY).stroke({ color: _options.rulerColor, width: 1, alpha: 0.5 })

    // Vertical crosshair line
    this.crosshair.moveTo(centerX, 30).lineTo(centerX, height).stroke({ color: _options.rulerColor, width: 1, alpha: 0.5 })

    // Center point marker
    this.crosshair.circle(centerX, centerY, 3)
      .fill({ color: _options.rulerColor, alpha: 0.7 })
  }

  private addLabel (text: string, x: number, y: number, anchor: 'left' | 'center' | 'right' = 'left') {
    const style = new TextStyle({
      fontFamily: 'monospace',
      fontSize: 10,
      fill: _options.labelColor,
      stroke: {
        color: _options.backgroundColor,
        width: 1,
      },
    })

    const label = new Text({ text, style })

    switch (anchor) {
      case 'center':
        label.anchor.set(0.5, 0.5)
        break
      case 'right':
        label.anchor.set(1, 0.5)
        break
      case 'left':
        label.anchor.set(0, 0.5)
        break
    }

    label.x = x
    label.y = y

    this.labels.addChild(label)
  }

  // AppScreen interface methods
  async show (): Promise<void> {
    this.visible = true
  }

  async hide (): Promise<void> {
    this.visible = false
  }

  prepare (): void {
    // Setup initial state
  }

  reset (): void {
    // Clean up state
    this.rulers.clear()
    this.crosshair.clear()
    this.labels.removeChildren()
  }

  update (ticker: Ticker): void {
    // Update logic if needed
  }

  resize (width: number, height: number): void {
    this.buildRulers(width, height)
  }

  blur (): void {
    this.alpha = 0.5
  }

  focus (): void {
    this.alpha = 0.8
  }

  onLoad (progress: number): void {
    // Handle loading progress
  }

  /**
   * Toggle visibility of the measurement overlay
   */
  toggle (): void {
    this.visible = !this.visible
  }
}
