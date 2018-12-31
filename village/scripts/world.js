'use strict'

function World (stage) {
  GameObject.call(this, 'world')

  this.storage = {
    lobby: _lobby(),
    forest: _forest(),
    tower: _tower(),
    fork: _fork()
    // den: _den()
  }
}
