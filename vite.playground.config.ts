import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// Config khusus untuk menjalankan playground (yarn dev).
// Root diarahkan ke folder playground/ supaya index.html-nya ketemu.
export default defineConfig({
    root: resolve(__dirname, 'playground'),
    plugins: [vue()],
    server: {
        port: 5173,
        open: true,
    },
})
