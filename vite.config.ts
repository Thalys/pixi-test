// @ts-check

import type { UserConfig } from 'vite'
import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import { assetpackPlugin } from './scripts/assetpack-vite-plugin'
import { logger } from './src/tools/logger'

logger.debug(process.env.npm_package_version)

export default defineConfig(async ({ command, mode, isPreview }) => {
  console.log({ command, mode, isPreview })
  const config: UserConfig = {
    cacheDir: path.resolve(__dirname, 'node_modules/.cache/vite'),
    plugins: [assetpackPlugin()],
    server: {
      port: 3489,
      open: false,
    },
    define: {
      VITE_APP_VERSION: `${process.env.npm_package_version}`,
      __DEV__: !isPreview,
      NODE_ENV: `${mode}`,
    },
    envPrefix: ['VITE_'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
    },
  }

  console.log(config.define)

  return config
})
