# Tagged Template Animation API for PixiJS + Motion

## Overview

This POC creates a TailwindCSS-inspired animation API using JavaScript tagged templates, combining the power of PixiJS and Motion into a more declarative and manageable system.

## Design Principles (Following TailwindCSS Philosophy)

### 1. **Utility-First Approach**

Instead of creating specialized animation classes, we provide small, composable animation utilities:

```typescript
// Before: Custom animation classes with complex configs
class FadeInAnimation { /* complex setup */ }

// After: Utility-first approach
anim`fade-in duration-800 ease-backOut`(sprite)
```

### 2. **Composable Modifiers**

Just like TailwindCSS classes, animations can be modified with simple, predictable modifiers:

```typescript
anim`fade-in duration-500`(sprite)           // Basic fade
anim`fade-in duration-800 ease-bounce`(sprite) // With easing
anim`fade-in-up stagger-100`(sprites)        // Multiple elements
anim`fade-in spring stiffness-400`(sprite)   // Spring physics
```

### 3. **Predictable Naming Convention**

Animation names follow a consistent pattern: `action-direction-modifier`

- `fade-in`, `fade-out`, `fade-in-up`
- `scale-in`, `scale-out`, `scale-bounce`
- `slide-up`, `slide-down`, `slide-in-left`
- `spin`, `spin-slow`, `wobble`

## Key Benefits

### 1. **Reduced Cognitive Load**

```typescript
// Before: Remember different option objects for each animation
await animate(sprite, { alpha: 1, y: 0 }, { duration: 0.4, ease: 'easeOut' })
await animate(sprite, { scale: 1 }, { type: 'spring', stiffness: 300 })

// After: Semantic names with intuitive modifiers
await anim`fade-in-up duration-400`(sprite).play()
await anim`scale-bounce spring-300`(sprite).play()
```

### 2. **Better Discoverability**

The tagged template approach with IntelliSense makes animations discoverable:

- IDE can suggest available animations
- Modifiers are self-documenting
- Consistent naming patterns are easy to remember

### 3. **Maintainable Defaults**

Each animation comes with carefully chosen defaults that work well out of the box:

```typescript
anim`fade-in`(sprite)     // Good defaults: 300ms, easeOut
anim`scale-bounce`(sprite) // Good defaults: spring physics with nice feel
```

### 4. **Easy Customization**

When defaults aren't enough, customization is still straightforward:

```typescript
// Template modifiers for common cases
anim`fade-in duration-1000 ease-circOut`(sprite)

// Function options for complex cases
anim`fade-in`(sprite, {
  onComplete: () => console.log('Done!'),
  onUpdate: progress => updateProgressBar(progress)
})
```

### 5. **Performance Optimizations**

The API can optimize common patterns under the hood:

- Stagger animations are automatically optimized
- Hardware acceleration preferences are built into presets
- Memory efficient animation object reuse

## Comparison with Current Approach

### Current (Direct Motion calls)

```typescript
// Verbose and requires remembering many options
await animate(container, { scale: 1 }, { ease: 'circInOut', duration: 1 })
await animate(bunny, { rotation: 90 * DEG_TO_RAD }, {
  type: 'spring',
  repeat: Infinity,
  repeatDelay: 0.2
})
await animate(bunnies, { alpha: 1, y: [50, 0] }, { delay: stagger(0.05) })
```

### With Tagged Template API

```typescript
// Semantic, concise, and discoverable
await anim`scale-in ease-circInOut duration-1000`(container).play()
await anim`rotate-90 spring repeat-infinite delay-200`(bunny).play()
await anim`fade-in-up stagger-50`(bunnies).play()
```

## Advanced Features

### 1. **Animation Controls**

```typescript
const spinAnim = anim`spin-slow`(sprite)
spinAnim.play()
spinAnim.pause()
spinAnim.reverse()
spinAnim.stop()
```

### 2. **Custom Animation Builder**

```typescript
const customSlideIn = createCustomAnimation(
  { x: -200, alpha: 0 },
  { x: 0, alpha: 1 },
  { duration: 0.8, ease: 'backOut' }
)
```

### 3. **Convenience Functions for Common Cases**

```typescript
animations.fadeIn(sprite)
animations.scaleIn(sprite, { duration: 0.5 })
animations.slideUp(sprite)
```

## Implementation Benefits

### 1. **Type Safety**

The API can be fully typed with TypeScript, providing:

- Autocomplete for animation names
- Type checking for PixiJS objects
- Validated option combinations

### 2. **Extensibility**

Easy to add new animations:

```typescript
ANIMATION_PRESETS['my-custom-anim'] = {
  from: { /* initial state */ },
  to: { /* target state */ },
  options: { /* default options */ }
}
```

### 3. **Framework Agnostic**

While designed for PixiJS + Motion, the pattern could work with:

- React + Framer Motion
- Vue + other animation libraries
- Any object-based animation system

## Migration Strategy

The API is designed to be additive - you can gradually migrate:

1. **Phase 1**: Use tagged templates for new animations
2. **Phase 2**: Migrate common animation patterns
3. **Phase 3**: Create custom animations for complex cases
4. **Phase 4**: Deprecate direct Motion calls in favor of the API

## Example Use Cases

### Game UI Animations

```typescript
// Menu transitions
await anim`slide-in-left stagger-100`(menuItems).play()

// Button interactions
await anim`scale-bounce duration-200`(button).play()

// Error states
await anim`shake-x`(invalidField).play()
```

### Particle Effects

```typescript
// Burst effects
await anim`scale-in stagger-20`(particles).play()
await anim`fade-out delay-1000`(particles).play()
```

### Loading States

```typescript
// Skeleton loading
anim`scale-pulse`(loadingElements).play()

// Progress indicators
const progressAnim = createCustomAnimation(
  { value: 0 },
  { value: 100 },
  { duration: 2, onUpdate: progress => updateBar(progress) }
)
```

This approach provides the benefits of TailwindCSS (utility-first, composable, discoverable) while maintaining the power and flexibility needed for game animations.
