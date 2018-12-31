'use strict'

function ActionNPC (pos = { x: 0, y: 0, z: 0 }) {
  Event.call(this, 'blocker', pos)

  this.sprite.asset = `npc/favo`
  this.sprite.offset = { x: -1, y: -2.75 }

  this.isBlocker = true

  this.sprite.size = { w: 3, h: 3 }

  this.toString = function () {
    return ''
  }
}
