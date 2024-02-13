import * as path from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/@',
  plugins: [svgr({ include: '**/*.svg' }), react()],

  build: {
    outDir: 'dist-app',
  },

  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/core' as *;\n`,
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },

  server: {
    host: 'localhost',
    port: 3000,
  },
})
