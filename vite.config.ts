// @ts-check

import type { UserConfig } from 'vite'
import path from 'node:path'
import { defineConfig } from 'vite'
import { vitePluginVersionMark as pluginVersionMark } from 'vite-plugin-version-mark'
import { pluginAssetpack } from './scripts/assetpack-vite-plugin'

export default defineConfig(async ({ command, mode, isPreview }) => {

  console.log({ command, mode, isPreview })
  const config: UserConfig = {
    plugins: [
      pluginAssetpack(),
      pluginVersionMark({ ifShortSHA: true }),
    ],

    cacheDir: path.resolve(__dirname, './node_modules/.cache/.vite'),
    clearScreen: false,
    server: {
      port: 3489,
      open: false,
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
    },
  }

  console.log(config.define)

  return config
})
