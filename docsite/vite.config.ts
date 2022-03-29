import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    rollupOptions: {
      external: ['Alpine', 'htmx.org'],
      output: {
        dir: './dist'
      }
    }
  },
  base: '/alpinebricks/',
})