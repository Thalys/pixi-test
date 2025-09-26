import type { Container } from 'pixi.js'
import type { AnimateResultPlaybackControls, AnimationOptions } from '@/anime/anime.types'
import { animate } from '@/anime/anime.motion'
import { parseAnimationString } from '@/anime/anime.parse'
import { ANIMATION_PRESETS } from '@/anime/anime.presets'
import { keysOf } from '@/lib/object'

type Presets = keyof typeof ANIMATION_PRESETS & string

// Main tagged template function
export function anime (
  strings: TemplateStringsArray,
  ...values: Presets[]
): (target: Container | Container[], customOptions?: AnimationOptions) => AnimateResultPlaybackControls {
  // Combine template strings
  let animationString = ''
  for (let i = 0; i < strings.length; i++) {
    animationString += strings[i]
    if (i < values.length) {
      animationString += String(values[i])
    }
  }

  const { baseAnimation, modifiers } = parseAnimationString(animationString)

  return (target: Container | Container[], customOptions: AnimationOptions = {}) => {
    const preset = ANIMATION_PRESETS[baseAnimation as keyof typeof ANIMATION_PRESETS]

    if (!preset) {
      throw new Error(`Unknown animation: ${baseAnimation}. Available: ${keysOf(ANIMATION_PRESETS).join(', ')}`)
    }

    // Merge options: preset < modifiers < customOptions
    const finalOptions = {
      ...preset.options,
      ...modifiers,
      ...customOptions,
    }

    // Handle stagger for multiple targets
    // if (Array.isArray(target) && modifiers.stagger) {
    //   finalOptions.delay = stagger(0.1)
    // }

    // Store initial values and set 'from' state
    const targets = Array.isArray(target) ? target : [target]
    const initialStates = targets.map((t) => {
      const state: any = {}
      keysOf(preset.from)
        .forEach((key) => {
          state[key] = (t as any)[key]
        })
      return state
    })

    // Set initial 'from' state
    targets.forEach((t) => {
      Object.assign(t, preset.from)
    })

    let controller: any

    // @ts-expect-error FIXME - type error
    const result: AnimateResultPlaybackControls = {
      play () {
        controller = animate(target, preset.to, finalOptions)
        return controller
      },

      pause () {
        if (controller?.pause) controller.pause()
      },

      stop () {
        if (controller?.stop) controller.stop()
        // Restore initial states
        targets.forEach((t, i) => {
          Object.assign(t, initialStates[i])
        })
      },

      reverse () {
        if (controller?.reverse) {
          controller.reverse()
        } else {
          // Manual reverse by animating back to initial state
          animate(target, initialStates.length === 1 ? initialStates[0] : initialStates, finalOptions)
        }
      },
    }

    return result
  }
}

// Usage examples and convenience functions
export const animations = {
  // Quick access to common animations
  fadeIn: (target: Container | Container[], options?: AnimationOptions) =>
    anime`fade-in`(target, options),

  fadeOut: (target: Container | Container[], options?: AnimationOptions) =>
    anime`fade-out`(target, options),

  scaleIn: (target: Container | Container[], options?: AnimationOptions) =>
    anime`scale-in`(target, options),

  slideUp: (target: Container | Container[], options?: AnimationOptions) =>
    anime`slide-up`(target, options),

  bounce: (target: Container | Container[], options?: AnimationOptions) =>
    anime`bounce`(target, options),

  spin: (target: Container | Container[], options?: AnimationOptions) =>
    anime`spin`(target, options),
}

// Advanced usage with custom values
export function createCustomAnimation (
  from: { [key: string]: any },
  to: { [key: string]: any },
  defaultOptions: AnimationOptions = {},
) {
  return <T extends Container | object>(target: T | T[], options: AnimationOptions = {}) => {
    const finalOptions = { ...defaultOptions, ...options }

    // Set initial state
    const targets = Array.isArray(target) ? target : [target]
    targets.forEach(t => Object.assign(t, from))

    let controller: any

    return {
      async play () {
        controller = animate(target, to, finalOptions)
        return controller
      },
      pause () { if (controller?.pause) controller.pause() },
      stop () { if (controller?.stop) controller.stop() },
      reverse () { if (controller?.reverse) controller.reverse() },
    }
  }
}

/*
USAGE EXAMPLES:

// Basic animations with tagged templates
await anim`fade-in`(mySprite).play()
await anim`scale-bounce duration-800`(myContainer).play()
await anim`slide-in-left ease-backOut`(myText).play()

// With stagger for multiple elements
await anim`fade-in-up stagger-100`(sprites).play()
await anim`scale-in duration-600 stagger-50`([sprite1, sprite2, sprite3]).play()

// With custom options
await anim`zoom-in`(mySprite, {
  duration: 1.2,
  onComplete: () => console.log('Animation done!')
}).play()

// Using convenience functions
await animations.fadeIn(mySprite).play()
await animations.scaleIn([sprite1, sprite2], { delay: 0.2 }).play()

// Custom animations
const customFlyIn = createCustomAnimation(
  { x: -200, alpha: 0, rotation: -Math.PI },
  { x: 0, alpha: 1, rotation: 0 },
  { duration: 1, ease: 'backOut' }
)
await customFlyIn(mySprite).play()

// Chaining animations
const sprite = mySprite
await anim`fade-in`(sprite).play()
await anim`scale-bounce`(sprite).play()
await anim`wobble`(sprite).play()

// Animation controls
const bounceAnim = anim`bounce`(mySprite)
bounceAnim.play()
// Later...
bounceAnim.pause()
bounceAnim.reverse()
*/
