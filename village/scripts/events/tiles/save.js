'use strict'

function SaveTile (pos = { x: 0, y: 0, z: -1 }, stack = []) {
  Event.call(this, 'save', pos)

  this.sprite.color = '#72dec2'

  this.onStep = function (e) {
    this.stage.player.control.stack = []
    this.stage.player.pos.effect = { x: 1, y: 1 }
  }
}
