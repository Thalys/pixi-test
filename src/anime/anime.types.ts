import type {
  animate as mAnimate,
  AnimationPlaybackControls as mAnimationPlaybackControls,
  ValueAnimationWithDynamicDelay as mValueAnimationWithDynamicDelay,
  ValueTransition as mValueTransition,
  VariableTransitions as mVariableTransitions,
} from 'motion'

type MotionAnimateParams = Parameters<typeof mAnimate>
export type AnimateParamSubject = MotionAnimateParams[0]
export type AnimateParamTargetValues = MotionAnimateParams[1]

type _AnimationOptions
  = | mValueAnimationWithDynamicDelay
    | (
    mValueAnimationWithDynamicDelay
    // & StyleTransitions
    // & SVGPathTransitions
    // & SVGForcedAttrTransitions
    // & SVGTransitions
    & mVariableTransitions
    & {
      default?: mValueTransition
      layout?: mValueTransition
    }
  )

// Animation configuration types
export type AnimationOptions = _AnimationOptions & {

  // TODO - Review this options
  duration?: number
  delay?: number
  ease?: string
  type?: 'tween' | 'spring'
  stiffness?: number
  damping?: number
  repeat?: number
  repeatDelay?: number
  direction?: 'normal' | 'reverse' | 'alternate'
  onComplete?: () => void
  onUpdate?: (progress: number) => void
}

export type AnimateParamOptions = AnimationOptions

export type AnimPreset = {
  from: { [key: string]: any }
  to: { [key: string]: any }
  options: AnimateParamOptions
}

export type AnimateResultPlaybackControls
  = mAnimationPlaybackControls
    & {
      reverse: () => void
    }
