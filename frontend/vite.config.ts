import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5080,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './index.html'),
        Dashboard: path.resolve(__dirname, './src/static/dashboard.html')
      }
    },
    sourcemap: true,
    manifest: true,
    minify: false,
    emptyOutDir: true,
  }
})
