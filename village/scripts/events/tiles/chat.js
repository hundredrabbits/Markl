'use strict'

function ChatTile (pos = { x: 0, y: 0, z: -1 }, text = '') {
  Event.call(this, 'chat', pos)

  this.sprite.color = 'red'

  this.isBlocker = true

  this.onCollision = function (e) {
    this.stage.dialog.say(text)
  }
}
