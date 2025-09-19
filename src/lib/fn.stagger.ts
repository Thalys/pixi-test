export type StaggerFunction<T extends (...args: any[]) => any> = {
  call: (...args: Parameters<T>) => void
  onRelease: (callback: (result: ReturnType<T>) => void) => void
  destroy: () => void
  getPendingCount: () => number
  setDelay: (delayMs: number) => void
}

export function createStaggerFunction<T extends (...args: any[]) => any> (
  fn: T,
  delayMs: number = 50,
): StaggerFunction<T> {
  const pendingCalls: Array<{
    args: Parameters<T>
    timestamp: number
  }> = []

  let releaseCallback: ((result: ReturnType<T>) => void) | null = null
  let intervalId: NodeJS.Timeout | null = null
  let currentDelay = delayMs

  const processQueue = () => {
    const now = Date.now()

    // Find calls that are ready to be released
    const readyIndices: number[] = []

    for (let i = 0; i < pendingCalls.length; i++) {
      if (now - pendingCalls[i].timestamp >= currentDelay) {
        readyIndices.push(i)
      }
    }

    // Process ready calls (in reverse order to maintain indices)
    for (let i = readyIndices.length - 1; i >= 0; i--) {
      const index = readyIndices[i]
      const call = pendingCalls[index]

      // Execute the function
      const result = fn(...call.args)

      // Remove from pending
      pendingCalls.splice(index, 1)

      // Call the release callback if set
      if (releaseCallback) {
        releaseCallback(result)
      }
    }
  }

  // Start processing queue every 10ms for smooth operation
  intervalId = setInterval(processQueue, 10)

  const staggerFunction: StaggerFunction<T> = {
    call: (...args: Parameters<T>) => {
      pendingCalls.push({
        args,
        timestamp: Date.now(),
      })
    },

    onRelease: (callback: (result: ReturnType<T>) => void) => {
      releaseCallback = callback
    },

    destroy: () => {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
      pendingCalls.length = 0
      releaseCallback = null
    },

    getPendingCount: () => pendingCalls.length,

    setDelay: (newDelayMs: number) => {
      currentDelay = newDelayMs
    },
  }

  return staggerFunction
}
