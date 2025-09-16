/* eslint-disable no-console */

import type { BrowserConsole } from '@/types'

const wrap = (str: string, open: string, close: string) => `${open}${str}${close}`

export const green = (str: string) => wrap(str, '\u001B[32m', '\u001B[39m')
export const yellow = (str: string) => wrap(str, '\u001B[33m', '\u001B[39m')
export const red = (str: string) => wrap(str, '\u001B[31m', '\u001B[39m')
export const bold = (str: string) => wrap(str, '\u001B[1m', '\u001B[22m')
export const cyan = (str: string) => wrap(str, '\u001B[36m', '\u001B[39m')
export const magenta = (str: string) => wrap(str, '\u001B[35m', '\u001B[39m')

export const logger = {
  log: (...rest: Parameters<BrowserConsole['log']>) => {
    console.log(...rest)
  },
  info: (...rest: Parameters<BrowserConsole['info']>) => {
    console.info(`[${green('INFO')}]`, ...rest)
  },
  warn: (...rest: Parameters<BrowserConsole['warn']>) => {
    console.warn(`[${yellow('WARN')}]`, ...rest)
  },
  error: (...rest: Parameters<BrowserConsole['error']>) => {
    console.error(`[${red('ERROR')}]`, ...rest)
  },
  debug: (...rest: Parameters<BrowserConsole['debug']>) => {
    console.debug(`[${bold(cyan('DEBUG'))}]`, ...rest)
  },
  custom: (id: string = 'CUSTOM', color = magenta) =>
    (...rest: Parameters<BrowserConsole['log']>) => {
      console.log(`[${color(id)}]`, ...rest)
    },
  table: (...rest: Parameters<BrowserConsole['table']>) => {
    console.table(...rest)
  },
}

/* eslint-enable no-console */
