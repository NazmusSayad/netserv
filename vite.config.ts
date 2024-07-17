import path from 'path'
import { defineConfig } from 'vite'

// @ts-ignore
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/@',

  build: { outDir: 'dist-web' },
  server: { host: 'localhost', port: 3000 },
  resolve: { alias: { '@': path.resolve('./web') } },

  plugins: [svgr({ include: '**/*.svg' }), react()],

  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/core' as *;\n`,
      },
    },
  },
})
