'use strict'

function SafeTile (pos = { x: 0, y: 0, z: -1 }, stack = []) {
  Event.call(this, 'safe', pos)

  this.sprite.color = '#72dec2'

  this.onStep = function (e) {
    this.stage.player.control.stack = []
    this.stage.player.pos.effect = { x: 1, y: 1 }
    this.stage.player.last = this
    this.stage.player.stats.stamina.val = this.stage.player.stats.stamina.max
  }
}
