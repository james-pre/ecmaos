import { defineConfig } from "vite"
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import i18nextLoader from 'vite-plugin-i18next-loader'

const host = process.env.TAURI_DEV_HOST

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    nodePolyfills({ include: ['module', 'os', 'path'] }),
    i18nextLoader({ namespaceResolution: 'basename', paths: ['locales'] })
  ],
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 30888,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 30888
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"]
    }
  }
}))
