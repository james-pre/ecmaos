
import i18nextLoader from 'vite-plugin-i18next-loader'
import path from 'path'
import { defineConfig, ViteUserConfig } from 'vitest/config'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

import pkg from './package.json'

export default defineConfig({
  plugins: [
    nodePolyfills({ include: ['module', 'os', 'path'] }),
    i18nextLoader({ namespaceResolution: 'basename', paths: ['locales'] })
  ] as ViteUserConfig['plugins'],
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
    sourcemap: true,
    minify: false
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
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
