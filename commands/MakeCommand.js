const Command = require('./Command')

class MakeCommand extends Command {
  signature = 'make:command'

  handle() {
    this.stub('stubs/command.stub')
      .replace(/\$NAME/g, (writer) => writer.parameters[0])
      .replace(/\$SIGNATURE/, (writer) => writer.parameters[1])
      .setPath((writer) => `commands/${writer.parameters[0]}.js`)
      .save()
  }
}

module.exports = MakeCommand
