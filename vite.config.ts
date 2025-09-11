import path from 'node:path'
import process from 'node:process'

import { defineConfig } from 'vite'
import { assetpackPlugin } from './scripts/assetpack-vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  cacheDir: path.resolve(__dirname, 'node_modules/.cache/vite'),
  plugins: [assetpackPlugin()],
  server: {
    port: 3489,
    open: false,
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
})
