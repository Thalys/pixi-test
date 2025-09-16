declare const globalThis: {
  __PIXI_TEST_VERSION__: string | undefined
}

export function getAppVersion (): string {
  return globalThis.__PIXI_TEST_VERSION__ ?? '?.?.?'
}
