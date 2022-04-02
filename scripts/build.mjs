import { build } from 'vite'

await build({ configFile: 'src/main/vite.config.js' })
await build({ configFile: 'src/preload/vite.config.js' })
await build({ configFile: 'src/renderer/vite.config.js' })
