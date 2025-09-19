import type { Ticker } from 'pixi.js'
import { Container, DEG_TO_RAD, Rectangle } from 'pixi.js'
import textures from '@/app/textures'
import { engine } from '@/engine/engine.singleton'
import { SSpriteAnimated } from '@/engine/scene/sprite.animated'

export interface CometOptions {
  /** Custom bounds for comet movement */
  bounds?: Rectangle
  /** Animation speed multiplier */
  animationSpeed?: number
  /** Movement speed multiplier */
  movementSpeed?: number
}

/**
 * Phoenix Flame
 *
 * A particle-effect system showing fire comets with realistic movement patterns.
 * Keeps sprite count to maximum 10 as per requirements (I believe the 10 sprites must be in 'Textures'
 * on a single animation).
 */
export class CometSystem extends Container {
  private readonly comets: SSpriteAnimated[] = []
  private readonly options: Required<CometOptions>
  private readonly updateFunction: (ticker: Ticker) => void
  private readonly tickerRef: Ticker
  private tick = 0
  private isActive = false

  constructor (options: CometOptions = {}) {
    super()

    this.label = 'CometSystem'

    this.options = {
      bounds: options.bounds ?? new Rectangle(0, 0, 800, 600),
      animationSpeed: options.animationSpeed ?? 0.3,
      movementSpeed: options.movementSpeed ?? 1,
    }

    this.tickerRef = engine().ticker
    textures.loadFireTextures()

    // Create update function (bound to this instance)
    this.updateFunction = this.update.bind(this)
  }

  private createComet (): SSpriteAnimated {
    const comet = new SSpriteAnimated({ textures: textures.fireTextures })

    const padding = 50
    comet.x = padding + Math.random() * (this.options.bounds.width - padding * 2)
    comet.y = padding + Math.random() * (this.options.bounds.height - padding * 2)

    comet.anchor.set(0.5)
    comet.rotation = 180 * DEG_TO_RAD
    comet.animationSpeed = this.options.animationSpeed
    comet.play()

    comet.direction = Math.random() * Math.PI * 2
    comet.turningSpeed = (Math.random() - 0.5) * 0.4
    comet.speed = (2 + Math.random() * 3) * this.options.movementSpeed
    comet.offset = Math.random() * 100

    const scale = 0.8 + Math.random() * 0.4
    comet.scale.set(scale)

    return comet
  }

  public initialize (): void {
    this.clear()

    for (let i = 0; i < textures.fireTextures.length; i++) {
      const comet = this.createComet()
      this.addChild(comet)
      this.comets.push(comet)
    }
  }

  public start (): void {
    if (this.isActive) return

    this.isActive = true
    this.tickerRef.add(this.updateFunction)
  }

  public stop (): void {
    if (!this.isActive) return

    this.isActive = false
    this.tickerRef.remove(this.updateFunction)
  }

  private update (): void {
    if (!this.isActive) return

    const { bounds } = this.options
    const deltaTime = this.tickerRef.deltaTime

    for (const comet of this.comets) {

      // Breathing effect
      // comet.scale.y = comet.scale.x * (0.95 + Math.sin(this.tick + comet.offset) * 0.05)

      // Update direction with turning
      comet.direction += comet.turningSpeed * 0.01 * deltaTime

      // Update position
      const speedModifier = comet.speed * comet.scale.y * deltaTime
      comet.x += Math.sin(comet.direction) * speedModifier
      comet.y += Math.cos(comet.direction) * speedModifier

      // Update rotation to face movement direction
      comet.rotation = -comet.direction + Math.PI

      // Wrap around screen bounds
      if (comet.x < bounds.x) {
        comet.x = bounds.x + bounds.width
      } else if (comet.x > bounds.x + bounds.width) {
        comet.x = bounds.x
      }

      if (comet.y < bounds.y) {
        comet.y = bounds.y + bounds.height
      } else if (comet.y > bounds.y + bounds.height) {
        comet.y = bounds.y
      }
    }

    this.tick += 0.1 * deltaTime
  }

  public updateBounds (bounds: Rectangle): void {
    this.options.bounds = bounds
  }

  /**
   * Clear all comets and reset the system
   */
  public clear (): void {
    for (const comet of this.comets) {
      comet.destroy()
    }
    this.comets.length = 0
    this.removeChildren()
  }


  public override destroy (): void {
    this.clear()
    super.destroy()
  }


  public get cometCount (): number {
    return this.comets.length
  }


  public get active (): boolean {
    return this.isActive
  }
}
