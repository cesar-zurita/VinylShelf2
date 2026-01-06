import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/VinylShelf-2.0/'   // 👈 nombre EXACTO del repo
})