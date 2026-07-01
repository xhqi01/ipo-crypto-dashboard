import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 改成你的 repo 名称，例如 /ipo-crypto-dashboard/
  base: '/ipo-crypto-dashboard/',
})
