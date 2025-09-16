// Parse animation string and modifiers
export function parseAnimationString (animString: string) {
  const parts = animString.trim().split(/\s+/)
  const baseAnimation = parts[0]
  const modifiers: Record<string, string | number> = {}

  // Parse modifiers like "duration-500", "delay-100", "ease-bounce"
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i]
    const [key, value] = part.split('-')

    switch (key) {
      case 'duration':
      case 'delay':
      case 'stiffness':
      case 'damping':
      case 'repeat':
        modifiers[key] = Number.parseFloat(value)
        break
      case 'ease':
        modifiers[key] = value
        break
      case 'spring':
        modifiers.type = 'spring'
        break
      // case 'stagger':
      //   modifiers.stagger = Number.parseFloat(value) / 1000
      //   break
    }
  }

  return { baseAnimation, modifiers }
}
