import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],

  base: '/@',
  publicDir: path.join(__dirname, '/static'),

  server: { host: 'localhost', port: 3000 },
  build: { outDir: path.join(__dirname, '../dist/web') },
  resolve: { alias: { '@': path.join(__dirname, './') } },

  css: { devSourcemap: true },
})
