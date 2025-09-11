export const screens = [
  'Main',
  'Screen1',
  'Screen2',
  'Screen3',
] as const

export type Screens = typeof screens[number]
