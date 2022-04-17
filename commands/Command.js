const fs = require('fs')
// const chalk = require('chalk')

class StubWriter {
  constructor() {
    this.parameters = process.argv.slice(3)
  }

  read(path) {
    this.output = fs.readFileSync(path).toString()

    return this
  }

  replace(regex, handler) {
    if (Array.isArray(regex)) {
      const values = handler(this)

      regex.forEach((key, index) => {
        this.output = this.output.replace(key, values[index])
      })
    } else {
      this.output = this.output.replace(regex, handler(this))
    }

    return this
  }

  setPath(handler) {
    this.path = handler(this)

    return this
  }

  save() {
    fs.writeFileSync(this.path, this.output)

    return this
  }
}

class Command {
  constructor() {
    if (new.target === Command) {
      throw new TypeError('Cannot construct Abstract instances directly')
    }
  }

  process() {
    try {
      const output = this.handle()

      const message = `${this.constructor.name} command successful.`
      // chalk.green(message)
      console.log(message)

      return output
    } catch (error) {
      const message = `${this.constructor.name} failed to complete.`
      // chalk.red(message)
      console.log(message)

      throw error
    }
  }

  handle() {
    throw Error('handle method not defined.')
  }

  stub(path) {
    return new StubWriter().read(path)
  }
}

module.exports = Command
