'use strict'

function MirrorXTile (pos = { x: 0, y: 0, z: -1 }) {
  Event.call(this, 'rotate', pos)

  this.sprite.color = 'pink'

  this.onStep = function (e) {
    if (!e.pos.effect) { e.pos.effect = { x: 1, y: 1 } }
    e.pos.effect.x = e.pos.effect.x ? e.pos.effect.x * -1 : -1
  }
}
