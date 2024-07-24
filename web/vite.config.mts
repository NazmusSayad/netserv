import path from 'path'
import { defineConfig } from 'vite'

console.log()

// @ts-ignore
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/@',

  server: { host: 'localhost', port: 3000 },
  build: { outDir: path.join(__dirname, '../dist-app') },
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
