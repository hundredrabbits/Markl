'use strict'

function Safe () {
  Event.call(this, 'safe')

  this.sprite.color = '#f00'
  this.sprite.asset = `level/garden/floor/safe`

  this.onStep = function (e) {
    this.stage.player.control.clear()
    this.stage.player.pos.effect = { x: 1, y: 1 }
    this.stage.player.pos.prev = this.stage.player.pos
    this.stage.player.last = { level: this.level.name, pos: { x: this.pos.x, y: this.pos.y, z: 0 } }
    this.stage.player.stats.stamina.val = this.stage.player.stats.stamina.max
    this.stage.camera.focus()
  }

  this.toString = function () {
    return `safe`
  }
}
