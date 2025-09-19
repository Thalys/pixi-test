/**
 * NOTE - DOOM - 2. Create a Color Palette
 * Color palette for the fire effect - represents temperature gradient from cold (black) to hot (white)
 * Each color corresponds to a fire intensity level (0-36)
 */
export const paletteDOOM: string[] = [
  '#070707',
  '#1f0707',
  '#2f0f07',
  '#470f07',
  '#571707',
  '#671f07',
  '#771f07',
  '#8f2707',
  '#9f2f07',
  '#af3f07',
  '#bf4707',
  '#c74707',
  '#df4f07',
  '#df5707',
  '#df5707',
  '#d75f07',
  '#d75f07',
  '#d7670f',
  '#cf6f0f',
  '#cf770f',
  '#cf7f0f',
  '#cf8717',
  '#c78717',
  '#c78f17',
  '#c7971f',
  '#bf9f1f',
  '#bf9f1f',
  '#bfa727',
  '#bfa727',
  '#bfaf2f',
  '#b7af2f',
  '#b7b72f',
  '#b7b737',
  '#cfcf6f',
  '#dfdf9f',
  '#efefc7',
  '#ffffff',
] as const

/**
 * Corresponds to the level 37, Index 36 of the `paletteDOOM`
 */
export const MAX_INTENSITY_INDEX = paletteDOOM.length - 1

/**
 *
 */
export const MAX_HEAT_LEVEL = 100 as const
