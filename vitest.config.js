import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@main': path.resolve(__dirname, './src/main'),
      '@preload': path.resolve(__dirname, './src/preload'),
      '@renderer': path.resolve(__dirname, './src/renderer/src'),
      '@common': path.resolve(__dirname, './src/common'),
      '@database': path.resolve(__dirname, './src/main/database'),
      '@handlers': path.resolve(__dirname, './src/main/handlers')
    }
  },
  plugins: [Vue()]
})
