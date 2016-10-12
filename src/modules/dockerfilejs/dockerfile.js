const instruction = require('./bin/instruction.js')
const model = require('./bin/model.js')
import _ from 'lodash'

function InstructionWrap(name, data, on_build_flag, fn) {
  this.name = name
  this.data = data
  this.on_build_flag = on_build_flag
  this.fn = fn
}

class Dockerfile {

  constructor() {

    var steps = []
    this._separator = '\n\n'
    this.steps = () => steps
    this.append = (step) => {
      steps.push(step);
      return this
    }
    this.prepend = (step) => {
      steps.unshift(step);
      return this
    }
    this.splice = (start, step) => {
      steps.splice(start, 0, step)
      return this
    }

    const that = this
    this.helper = {
      append(str, on_build_flag) {
        that.append(new InstructionWrap('append', data, on_build_flag, () => {
          return str
        }))
        return that
      },
      header(title, on_build_flag) {
        let str = ''
        str += '# ' + '-'.repeat(78) + '\n'
        str += '# ' + title + '\n'
        str += '# ' + '-'.repeat(78) + '\n'
        that.append(new InstructionWrap('header', str, on_build_flag, () => {
          return str
        }))
        return that
      },
      // Dockerfile plugin interface.
      use(plugin) {
        plugin(that)
        return that
      }
    }

    this.attachInstructions()

  }

  attachInstructions() {

    Object.keys(instruction).forEach(name => {
      const fn = instruction[name]
      if (name == 'from') {
        Dockerfile.prototype[name] = function(data, on_build_flag) {
          var from = new InstructionWrap(name, data, on_build_flag, fn)
          var start = this.steps().findIndex(step => step.name != 'comment')
          this.splice(start, from)
          return this
        }
      } else {
        Dockerfile.prototype[name] = function(data, on_build_flag) {
          this.append(new InstructionWrap(name, data, on_build_flag, fn))
          return this
        }
      }
    })
  }

  /** set step / section separator */
  separator(separator) {
    this._separator = separator
    return this
  }

  renderSteps(steps) {
    // unused parameter
    return this
      .steps()
      .map(step => step.fn(step.data, step.on_build_flag).trim())
  }

  render(steps) {
    return this.renderSteps(steps).join(this._separator || '\n')
  }

}

module.exports.Dockerfile = Dockerfile
module.exports.instruction = instruction
module.exports.model = model
