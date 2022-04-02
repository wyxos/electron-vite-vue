const { execSync } = require('child_process')

require('dotenv').config()

const token = process.env.GH_TOKEN

execSync(`cross-env GH_TOKEN=${token} electron-builder -- -p always`)
