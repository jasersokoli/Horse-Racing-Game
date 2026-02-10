import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/Horse-Racing-Game/',
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
