'use strict'

function WarpTile (pos = { x: 0, y: 0, z: -1 }, targetName, targetPos) {
  Event.call(this, 'warp', pos)

  this.sprite.color = '#f00'

  this.onStep = function (e) {
    this.stage.player.control.stack = []
    this.stage.player.pos.effect = { x: 1, y: 1 }
    markl.stage.enter(targetName, targetPos)
  }

  this.toString = function () {
    return `to->${targetName}`
  }
}
