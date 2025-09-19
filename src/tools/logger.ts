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

/* eslint-enable no-console */
