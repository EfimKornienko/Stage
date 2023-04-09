import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import { URL, fileURLToPath } from "node:url"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: false,
    port: 3001
  },
  resolve: {
    alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  }
})
