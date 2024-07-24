import path from 'path'
import { defineConfig } from 'vite'

// @ts-ignore
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/@',
  publicDir: path.join(__dirname, '/static'),

  server: { host: 'localhost', port: 3000 },
  build: { outDir: path.join(__dirname, '../dist-web') },
  resolve: { alias: { '@': path.join(__dirname, './') } },

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
