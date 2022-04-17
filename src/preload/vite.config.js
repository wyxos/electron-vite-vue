import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import pkg from '../../package.json'
import path from 'path'

export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      '@preload': path.resolve(__dirname),
      '@common': path.resolve(__dirname, '../common')
    }
  },
  build: {
    outDir: '../../dist/preload',
    lib: {
      entry: 'index.js',
      formats: ['cjs'],
      fileName: () => '[name].cjs'
    },
    minify: process.env.NODE_ENV === 'production',
    sourcemap: 'inline',
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules,
        ...Object.keys(pkg.dependencies || {})
      ]
    }
  }
})
