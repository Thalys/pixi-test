// @ts-check

import type { UserConfig } from 'vite'
import path from 'node:path'
import { defineConfig } from 'vite'
import { vitePluginVersionMark as pluginVersionMark } from 'vite-plugin-version-mark'
import pkg from './package.json'
import { pluginAssetpack } from './scripts/assetpack-vite-plugin'
import { logger } from './src/tools/logger'

export default defineConfig(async ({ command, mode, isPreview }) => {

  const isDev = mode === 'development'

  isDev && logger.info({ command, mode, isPreview })

  const config: UserConfig = {
    plugins: [
      pluginAssetpack(),
      pluginVersionMark({
        ifGlobal: true, // Creates a global variable (default: true)
        ifMeta: false, // Adds meta tag to HTML (default: true)
        ifLog: isDev, // Logs version to console (default: true)
        ifExport: false, // Exports version in library mode (default: false)

        command: {
          commands: [
            {
              alias: 'branch',
              cmd: 'git rev-parse --abbrev-ref HEAD',
              fallback: 'unknown',
            },
            {
              alias: 'shortSha',
              cmd: 'git rev-parse --short HEAD',
              timeout: 5000,
            },
          ],
          format: `v${pkg.version}-{branch}-{shortSha}`, // Custom format template
          errorStrategy: 'fallback', // Use fallback values on error
          parallel: true, // Execute commands in parallel
        // Output: "v1.0.0-main-abc1234"
        },
      }),
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

  // isDev && logger.custom('VITE_CONF')(config)

  return config
})
