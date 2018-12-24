'use strict'

function Blocker (pos = { x: 0, y: 0, z: 0 }) {
  Event.call(this, 'blocker', pos)

  this.sprite.color = 'grey'
}
