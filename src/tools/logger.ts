/* eslint-disable no-console */

import type { TConsole } from '@/tools/types'

const wrap = (str: string, open: string, close: string) => `${open}${str}${close}`

export const green = (str: string) => wrap(str, '\u001B[32m', '\u001B[39m')
export const yellow = (str: string) => wrap(str, '\u001B[33m', '\u001B[39m')
export const red = (str: string) => wrap(str, '\u001B[31m', '\u001B[39m')
export const bold = (str: string) => wrap(str, '\u001B[1m', '\u001B[22m')
export const cyan = (str: string) => wrap(str, '\u001B[36m', '\u001B[39m')
export const magenta = (str: string) => wrap(str, '\u001B[35m', '\u001B[39m')

export const logger = {
  log: (...rest: Parameters<TConsole['log']>) => {
    console.log(...rest)
  },
  info: (...rest: Parameters<TConsole['info']>) => {
    console.info(`[${green('INFO')}]`, ...rest)
  },
  warn: (...rest: Parameters<TConsole['warn']>) => {
    console.warn(`[${yellow('WARN')}]`, ...rest)
  },
  error: (...rest: Parameters<TConsole['error']>) => {
    console.error(`[${red('ERROR')}]`, ...rest)
  },
  debug: (...rest: Parameters<TConsole['debug']>) => {
    console.debug(`[${bold(cyan('DEBUG'))}]`, ...rest)
  },
  custom: (id: string = 'CUSTOM', color = magenta) =>
    (...rest: Parameters<TConsole['log']>) => {
      console.log(`[${color(id)}]`, ...rest)
    },
  table: (...rest: Parameters<TConsole['table']>) => {
    console.table(...rest)
  },
}

export function withLogging<T extends (...args: any[]) => any> (fn: T): T {
  return new Proxy(fn, {
    apply (target, thisArg, args) {
      const fnName = target.name || 'anonymous'
      logger.log(`Executing: ${fnName}`)
      logger.log('Args:', args.length > 0 ? args : 'none')

      const result = target.apply(thisArg, args)

      if (result instanceof Promise) {
        return result
          .then((value) => {
            logger.log(`✅ Completed async: ${fnName}`)
            logger.log('   Result:', value)
            return value
          })
          .catch((error) => {
            logger.log(`❌ Failed async: ${fnName}`)
            logger.log('   Error:', error)
            throw error
          })
      }

      logger.log(`✅ Completed: ${fnName}`)
      logger.log('   Result:', result)
      return result
    },
  })
}

/* eslint-enable no-console */
