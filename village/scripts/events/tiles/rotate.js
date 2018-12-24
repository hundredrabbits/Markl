'use strict'

function RotateTile (pos = { x: 0, y: 0 }) {
  Event.call(this, 'rotate', pos)

  this.sprite.color = 'pink'
}
