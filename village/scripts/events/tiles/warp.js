'use strict'

function WarpTile (pos = { x: 0, y: 0, z: -1 }, targetName, targetPos) {
  Event.call(this, 'warp', pos)

  this.sprite.color = '#f00'

  this.onStep = function (e) {
    markl.stage.enter(targetName, targetPos)
  }

  this.toString = function () {
    return `to->${targetName}`
  }
}
