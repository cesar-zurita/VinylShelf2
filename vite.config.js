import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/VinylShelf2/'   // 👈 NOMBRE EXACTO DEL REPO
})