/* eslint-disable no-console */

import type { BrowserConsole } from '@/types'

const wrap = (str: string, open: string, close: string) => `${open}${str}${close}`

const green = (str: string) => wrap(str, '\u001B[32m', '\u001B[39m')
const yellow = (str: string) => wrap(str, '\u001B[33m', '\u001B[39m')
const red = (str: string) => wrap(str, '\u001B[31m', '\u001B[39m')
const bold = (str: string) => wrap(str, '\u001B[1m', '\u001B[22m')
const cyan = (str: string) => wrap(str, '\u001B[36m', '\u001B[39m')
const magenta = (str: string) => wrap(str, '\u001B[35m', '\u001B[39m')

export const logger = {
  log: (...rest: Parameters<BrowserConsole['log']>) => {
    console.log(...rest)
  },
  info: (...rest: Parameters<BrowserConsole['info']>) => {
    const msg = `[${green('INFO')}]`
    console.info(msg, ...rest)
  },
  warn: (...rest: Parameters<BrowserConsole['warn']>) => {
    const msg = `[${yellow('WARN')}]`
    console.warn(msg, ...rest)
  },
  error: (...rest: Parameters<BrowserConsole['error']>) => {
    const msg = `[${red('ERROR')}]`
    console.error(msg, ...rest)
  },
  debug: (...rest: Parameters<BrowserConsole['debug']>) => {
    const msg = `[${bold(cyan('DEBUG'))}]`
    console.debug(msg, ...rest)
  },
  custom: (...rest: Parameters<BrowserConsole['log']>) => {
    const msg = `[${magenta('CUSTOM')}]`
    console.log(msg, ...rest)
  },
  table: (...rest: Parameters<BrowserConsole['table']>) => {
    console.table(...rest)
  },
}
