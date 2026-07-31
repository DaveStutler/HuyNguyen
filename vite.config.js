import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * GitHub Pages serves static files with no rewrite rule, so a direct visit or
 * refresh on a client-side route (/HuyNguyen/about) asks for a file that was
 * never built and gets GitHub's own 404 page — even though React Router could
 * have handled it.
 *
 * Pages does serve 404.html for any unmatched path, so shipping a byte-for-byte
 * copy of index.html under that name hands the request back to the app, which
 * then routes on the URL as normal.
 *
 * Reads outDir off the resolved config rather than using __dirname, which does
 * not exist in ESM (package.json sets "type": "module").
 */
function spaFallback() {
  let outDir

  return {
    name: 'spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/HuyNguyen/',
  plugins: [react(), tailwindcss(), spaFallback()],
})
