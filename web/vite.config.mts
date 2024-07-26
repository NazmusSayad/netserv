import path from 'path'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/@',
  publicDir: path.join(__dirname, '/static'),

  server: { host: 'localhost', port: 3000 },
  build: { outDir: path.join(__dirname, '../dist-web') },
  resolve: { alias: { '@': path.join(__dirname, './') } },

  plugins: [react()],

  css: { devSourcemap: true },
})
