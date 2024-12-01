import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  build: {
    outDir: './dist',
    emptyOutDir: true,
    lib: {
      entry: './swapi.ts',
      formats: ['es'],
      fileName: 'swapi'
    }
  },
  server: {
    port: Number(process.env['VITE_PORT']) || 30447
  }
})
