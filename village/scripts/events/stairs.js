'use strict'

function Stairs (pos = { x: 0, y: 0, z: 0 }) {
  Event.call(this, 'stairs', pos)

  this.sprite.color = 'grey'
  this.sprite.asset = `events/blockers/stairs`
  this.sprite.offset = { x: 0, y: -0.5 }
}
