const Command = require('./Command')

const fs = require('fs')

class MakeHandler extends Command {
  signature = 'make:handler'

  handle() {
    this.stub('stubs/handler.stub')
      .replace(/\$NAME/, (writer) => writer.parameters[0])
      .setPath((writer) => `src/main/handlers/${writer.parameters[0]}.js`)
      .save()

    const handlers = fs
      .readdirSync('src/main/handlers')
      .filter((file) => file.indexOf('index') === -1)

    this.stub('stubs/handler-index.stub')
      .replace(/\$imports/, () =>
        handlers
          .map((file) => `import ${file.replace(/\.js/, '')} from './${file}'`)
          .join('\n')
      )
      .replace(/\$callbacks/, () =>
        handlers.map((file) => `  ${file.replace(/\.js/, '')}`).join(',\n')
      )
      .setPath(() => 'src/main/handlers/index.js')
      .save()
  }
}

module.exports = MakeHandler
