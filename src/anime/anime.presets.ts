// Predefined animation presets inspired by TailwindCSS utility classes

import type { AnimPreset } from '@/anime/anime.types'

// Fade animations
const fadeIn: AnimPreset = { from: { alpha: 0 }, to: { alpha: 1 }, options: { duration: 0.3, ease: 'easeOut' } }
const fadeOut: AnimPreset = { from: { alpha: 1 }, to: { alpha: 0 }, options: { duration: 0.3, ease: 'easeIn' } }
const fadeInUp: AnimPreset = { from: { alpha: 0, y: 20 }, to: { alpha: 1, y: 0 }, options: { duration: 0.4, ease: 'easeOut' } }
const fadeInDown: AnimPreset = { from: { alpha: 0, y: -20 }, to: { alpha: 1, y: 0 }, options: { duration: 0.4, ease: 'easeOut' } }

// Scale animations
const scaleIn: AnimPreset = { from: { scale: 0 }, to: { scale: 1 }, options: { duration: 0.3, ease: 'backOut' } }
const scaleOut: AnimPreset = { from: { scale: 1 }, to: { scale: 0 }, options: { duration: 0.3, ease: 'backIn' } }
const scaleBounce: AnimPreset = { from: { scale: 0 }, to: { scale: 1 }, options: { type: 'spring', stiffness: 400, damping: 10 } }
const scalePulse: AnimPreset = { from: { scale: 1 }, to: { scale: 1.05 }, options: { duration: 0.6, direction: 'alternate', repeat: Infinity, ease: 'easeInOut' } }

// Slide animations
const slideInLeft: AnimPreset = { from: { x: -100, alpha: 0 }, to: { x: 0, alpha: 1 }, options: { duration: 0.4, ease: 'easeOut' } }
const slideInRight: AnimPreset = { from: { x: 100, alpha: 0 }, to: { x: 0, alpha: 1 }, options: { duration: 0.4, ease: 'easeOut' } }
const slideUp: AnimPreset = { from: { y: 50 }, to: { y: 0 }, options: { duration: 0.4, ease: 'easeOut' } }
const slideDown: AnimPreset = { from: { y: -50 }, to: { y: 0 }, options: { duration: 0.4, ease: 'easeOut' } }

// Rotation animations
const spin: AnimPreset = { from: { rotation: 0 }, to: { rotation: Math.PI * 2 }, options: { duration: 1, ease: 'linear', repeat: Infinity } }
const spinSlow: AnimPreset = { from: { rotation: 0 }, to: { rotation: Math.PI * 2 }, options: { duration: 3, ease: 'linear', repeat: Infinity } }
const wobble: AnimPreset = { from: { rotation: 0 }, to: { rotation: [-0.1, 0.1, -0.1, 0] }, options: { duration: 0.8, ease: 'easeInOut' } }

// Bounce animations
const bounce: AnimPreset = { from: { y: 0 }, to: { y: [-10, -20, -10, 0] }, options: { duration: 0.6, ease: 'easeOut' } }
const bounceIn: AnimPreset = { from: { scale: 0 }, to: { scale: [1.1, 0.9, 1.05, 1] }, options: { duration: 0.6, ease: 'easeOut' } }

// Shake animations
const shakeX: AnimPreset = { from: { x: 0 }, to: { x: [-5, 5, -5, 5, 0] }, options: { duration: 0.4, ease: 'easeInOut' } }
const shakeY: AnimPreset = { from: { y: 0 }, to: { y: [-5, 5, -5, 5, 0] }, options: { duration: 0.4, ease: 'easeInOut' } }

// Complex combined animations
const zoomIn: AnimPreset = { from: { scale: 0, alpha: 0 }, to: { scale: 1, alpha: 1 }, options: { duration: 0.4, ease: 'backOut' } }
const zoomOut: AnimPreset = { from: { scale: 1, alpha: 1 }, to: { scale: 0, alpha: 0 }, options: { duration: 0.4, ease: 'backIn' } }

export const ANIMATION_PRESETS = {
  // Fade animations
  'fade-in': fadeIn,
  'fade-out': fadeOut,
  'fade-in-up': fadeInUp,
  'fade-in-down': fadeInDown,

  // Scale animations
  'scale-in': scaleIn,
  'scale-out': scaleOut,
  'scale-bounce': scaleBounce,
  'scale-pulse': scalePulse,

  // Slide animations
  'slide-in-left': slideInLeft,
  'slide-in-right': slideInRight,
  'slide-up': slideUp,
  'slide-down': slideDown,

  // Rotation animations
  'spin': spin,
  'spin-slow': spinSlow,
  'wobble': wobble,

  // Bounce animations
  'bounce': bounce,
  'bounce-in': bounceIn,

  // Shake animations
  'shake-x': shakeX,
  'shake-y': shakeY,

  // Complex combined animations
  'zoom-in': zoomIn,
  'zoom-out': zoomOut,
} as const
