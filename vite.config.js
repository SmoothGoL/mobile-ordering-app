import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Development server port
  },
  preview: {
    port: 8003, // Port used after building when running `vite preview`
    allowedHosts: [
      "mobile-ordering-app.smoothgol.org",
      "mobile-ordering-app.smoothgol.com",
    ],
  },
})
