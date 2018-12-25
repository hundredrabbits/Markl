'use strict'

function OverrideTile (pos = { x: 0, y: 0, z: -1 }, stack = []) {
  Event.call(this, 'override', pos)

  this.sprite.color = '#666'

  this.onStep = function (e) {
    this.stage.player.control.stack = stack
  }
}
