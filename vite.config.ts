// @ts-check

import type { UserConfig } from 'vite'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { vitePluginVersionMark as pluginVersionMark } from 'vite-plugin-version-mark'
import pkg from './package.json' with { type: 'json' }
import { pluginAssetpack } from './scripts/vite-plugin/assetpack-vite-plugin.ts'
import { fullReloadWhen } from './scripts/vite-plugin/full-reload-by-ext.ts'

export default defineConfig(async ({ command, mode, isPreview }) => {

  const config: UserConfig = {
    cacheDir: '.vite',
    plugins: [
      fullReloadWhen(['ts', 'tsx', 'frag', 'vert']).change(),

      pluginVersionMark({
        ifGlobal: true, // Creates a global variable (default: true)
        ifMeta: false, // Adds meta tag to HTML (default: true)
        ifLog: false, // Logs version to console (default: true)
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
      pluginAssetpack(),
    ],
    clearScreen: false,
    server: {
      port: 3489,
      open: false,
    },
    resolve: {
      alias: { '@': resolve(import.meta.dirname, 'src') },
    },
  }

  return config
})
