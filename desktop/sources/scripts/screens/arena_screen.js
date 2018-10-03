'use strict'

function ArenaScreen () {
  Screen.call(this, 'arena')

  this.run = function () {
    const history = markl.scenario.render()

    console.log(history)
  }
}

module.exports = ArenaScreen
