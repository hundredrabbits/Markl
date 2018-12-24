'use strict'

function Player (pos = { x: 0, y: 0 }) {
  Event.call(this, 'player', pos)

  this.sprite.color = 'blue'
}
