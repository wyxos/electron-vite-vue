import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import pkg from '../../package.json'
import path from 'path'

export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      '@main': path.resolve(__dirname),
      '@database': path.resolve(__dirname, 'database'),
      '@handlers': path.resolve(__dirname, 'handlers'),
      '@common': path.resolve(__dirname, '../common')
    }
  },
  build: {
    outDir: '../../dist/main',
    lib: {
      entry: 'index.js',
      formats: ['cjs'],
      fileName: () => '[name].cjs'
    },
    minify: process.env.NODE_ENV === 'production',
    sourcemap: true,
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules,
        ...Object.keys(pkg.dependencies || {})
      ]
    }
  }
})
