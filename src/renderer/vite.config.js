import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import resolve from 'vite-plugin-resolve'
import electron from 'vite-plugin-electron-renderer'
import eslintPlugin from 'vite-plugin-eslint';
import pkg from '../../package.json'

export default defineConfig({
    mode: process.env.NODE_ENV,
    root: __dirname,
    plugins: [
        vue(),
        electron(),
        resolve(
            /**
             * Specify other modules
             * The module must be in `dependencies` and not in the` devDependencies`
             */
            {
                // If you use electron-store, this will work
                'electron-store': 'const Store = require("electron-store"); export default Store;',
            }
        ),
        eslintPlugin()
    ],
    base: './',
    build: {
        sourcemap: true,
        outDir: '../../dist/renderer',
    },
    server: {
        host: pkg.env.VITE_DEV_SERVER_HOST,
        port: pkg.env.VITE_DEV_SERVER_PORT,
    }
})
