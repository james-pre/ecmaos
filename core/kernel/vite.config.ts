/// <reference types="vitest/config" />
import path from 'path'
import { defineConfig } from 'vite'
import i18nextLoader from 'vite-plugin-i18next-loader'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

import pkg from './package.json'

export default defineConfig({
  plugins: [
    i18nextLoader({ namespaceResolution: 'basename', paths: ['locales'] }),
    nodePolyfills({ include: ['os', 'path'] })
  ],
  define: {
    'import.meta.env.NAME': JSON.stringify(pkg.name),
    'import.meta.env.VERSION': JSON.stringify(pkg.version),
    'import.meta.env.DESCRIPTION': JSON.stringify(pkg.description),
    'import.meta.env.HOMEPAGE': JSON.stringify(pkg.homepage),
    'import.meta.env.REPOSITORY': JSON.stringify(pkg.repository),
    'import.meta.env.AUTHOR': JSON.stringify(pkg.author),
    'import.meta.env.KNOWN_ISSUES': JSON.stringify(pkg.knownIssues),
    'import.meta.env.TIPS': JSON.stringify(pkg.tips)
  },
  resolve: {
    alias: {
      '@zenfs/core-dev': path.resolve(process.env['HOME'] || process.env['USERPROFILE'] || __dirname, 'code/zenfs-core/dist')
    }
  },
  server: {
    port: Number(process.env['VITE_PORT']) || 30443,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    },
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**', '**/docs/**', '**/wasm/**']
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1500,
    lib: {
      formats: ['es', 'cjs'],
      entry: {
        auth: './src/tree/auth.ts',
        components: './src/tree/components.ts',
        container: './src/tree/container.ts',
        device: './src/tree/device.ts',
        dom: './src/tree/dom.ts',
        events: './src/tree/events.ts',
        filesystem: './src/tree/filesystem.ts',
        i18n: './src/tree/i18n.ts',
        intervals: './src/tree/intervals.ts',
        kernel: './src/tree/kernel.ts',
        log: './src/tree/log.ts',
        memory: './src/tree/memory.ts',
        modules: './src/tree/modules.ts',
        processes: './src/tree/processes.ts',
        protocol: './src/tree/protocol.ts',
        service: './src/tree/service.ts',
        shell: './src/tree/shell.ts',
        storage: './src/tree/storage.ts',
        terminal: './src/tree/terminal.ts',
        users: './src/tree/users.ts',
        wasm: './src/tree/wasm.ts',
        workers: './src/tree/workers.ts'
      }
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    coverage: {
      include: ['src/**/*.ts'],
      reporter: ['text', 'html', 'json-summary', 'json'],
    },
    browser: {
      enabled: false,
      provider: 'playwright',
      name: 'chromium',
      providerOptions: {
        launch: {
          devtools: true
        }
      }
    },
    poolOptions: {
      forks: {
        execArgv: ['--no-warnings=ExperimentalWarning']
      }
    }
  }
})
