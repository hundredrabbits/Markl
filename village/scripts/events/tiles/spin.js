'use strict'

function Spin (clockwise = true) {
  Event.call(this, 'spin')

  this.sprite.color = 'black'
  this.sprite.asset = `level/garden/floor/spin`

  this.onStep = function (e) {
    e.control.stack = e.control.stack.map(this.rotate)
  }

  this.rotate = function (action) {
    if (action === INPUT.up) {
      return clockwise ? INPUT.left : INPUT.right
    }
    if (action === INPUT.right) {
      return clockwise ? INPUT.up : INPUT.down
    }
    if (action === INPUT.down) {
      return clockwise ? INPUT.right : INPUT.left
    }
    if (action === INPUT.left) {
      return clockwise ? INPUT.down : INPUT.up
    }
    return action
  }
}
