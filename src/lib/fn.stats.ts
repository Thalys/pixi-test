import { logger } from '@/tools/logger'

export type StatsFunction<T extends (...args: any[]) => number> = T & {
  getStats: () => { average: number, maximum: number, minimum: number, count: number }
  clearStats: () => void
  destroy: () => void
}

export function createStatsFunction<T extends (...args: any[]) => number> (
  fn: T,
  intervalMs: number = 1000,
): StatsFunction<T> {
  const cache = new Map<string, number>()
  const values: number[] = []
  let intervalId: NodeJS.Timeout | null = null

  const getKeyFromArgs = (args: Parameters<T>): string => {
    return JSON.stringify(args)
  }

  const calculateStats = () => {
    if (values.length === 0) {
      return { average: 0, maximum: 0, minimum: 0, count: 0 }
    }

    const sum = values.reduce((acc, val) => acc + val, 0)
    const average = sum / values.length
    const maximum = Math.max(...values)
    const minimum = Math.min(...values)

    return { average, maximum, minimum, count: values.length }
  }

  const printStats = () => {
    const stats = calculateStats()
    values.length = 0
    cache.clear()
    if (stats.count > 0) {
      logger.log(`Stats (${stats.count} calls): avg=${stats.average.toFixed(2)}, max=${stats.maximum}, min=${stats.minimum}`)
    }
  }

  // Start the interval
  intervalId = setInterval(printStats, intervalMs)

  const wrappedFunction = ((...args: Parameters<T>) => {
    const key = getKeyFromArgs(args)

    // Check cache first
    if (cache.has(key)) {
      const cachedValue = cache.get(key)!
      values.push(cachedValue)
      return cachedValue
    }

    // Calculate new value
    const result = fn(...args)

    // Store in cache and values array
    cache.set(key, result)
    values.push(result)

    return result
  }) as StatsFunction<T>

  // Add utility methods
  wrappedFunction.getStats = calculateStats

  wrappedFunction.clearStats = () => {
    values.length = 0
    cache.clear()
  }

  wrappedFunction.destroy = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    values.length = 0
    cache.clear()
  }

  return wrappedFunction
}
