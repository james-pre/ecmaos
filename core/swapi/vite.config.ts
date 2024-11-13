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
  }
})
