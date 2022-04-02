import { spawn } from 'child_process'
import { createServer, build } from 'vite'
import electron from 'electron'

const query = new URLSearchParams(import.meta.url.split('?')[1])
const debug = query.has('debug')

function watchMain(server) {
  let electronProcess = null
  const address = server.httpServer.address()
  const env = Object.assign(process.env, {
    VITE_DEV_SERVER_HOST: address.address,
    VITE_DEV_SERVER_PORT: address.port,
  })

  const startElectron = {
    name: 'electron-main-watcher',
    writeBundle() {
      electronProcess && electronProcess.kill()
      electronProcess = spawn(electron, ['.'], { stdio: 'inherit', env })
    },
  }

  return build({
    configFile: 'src/main/vite.config.js',
    mode: 'development',
    plugins: [!debug && startElectron].filter(Boolean),
    build: {
      watch: true,
    },
  })
}

function watchPreload(server) {
  return build({
    configFile: 'src/preload/vite.config.js',
    mode: 'development',
    plugins: [{
      name: 'electron-preload-watcher',
      writeBundle() {
        server.ws.send({ type: 'full-reload' })
      },
    }],
    build: {
      watch: true,
    },
  })
}

const server = await createServer({ configFile: 'src/renderer/vite.config.js' })

await server.listen()
await watchPreload(server)
await watchMain(server)
