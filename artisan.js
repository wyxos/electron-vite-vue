const parameters = process.argv.slice(2)

const commands = []

const normalizedPath = require('path').join(__dirname, 'commands')

require('fs')
  .readdirSync(normalizedPath)
  .forEach(function (file) {
    if (file === 'Command.js') {
      return
    }

    commands.push(require('./commands/' + file))
  })

const signatures = {}

commands.forEach((Command) => {
  const instance = new Command()
  signatures[instance.signature] = instance
})

const command = parameters[0]

if (!signatures[command]) {
  throw Error(`Command ${command} does not exist.`)
}

signatures[command].process()
