'use strict'

function HoleTile (pos = { x: 0, y: 0, z: -1 }, stack = []) {
  Event.call(this, 'hole', pos)

  this.sprite.color = '#09f'

  this.onStep = function (e) {
    markl.control.clear()
    this.stage.player.respawn()
  }
}
