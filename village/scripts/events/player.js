'use strict'

function Player (pos = { x: 0, y: 0 }) {
  Event.call(this, 'player', pos)

  this.control = null // sent from stage

  this.sprite.color = 'blue'

  this.run = function () {
    if (this.control.stack.length < 1) { console.warn('Nothing to play..'); return }

    const key = this.control.index % this.control.stack.length
    const cmd = this.act(this.control.stack[key])

    this.control.index++
  }

  this.act = function (cmd) {
    if (cmd === INPUT.up) {
      this.move(0, 1)
    } else if (cmd === INPUT.down) {
      this.move(0, -1)
    } else if (cmd === INPUT.left) {
      this.move(-1, 0)
    } else if (cmd === INPUT.right) {
      this.move(1, 0)
    }
  }

  this.move = function (x, y) {
    this.pos = { x: this.pos.x + x, y: this.pos.y + y }
  }
}
