import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', 
        changeOrigin: true,
        // 如果后端不带 /api 前缀，可取消注释下面一行
        // rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
