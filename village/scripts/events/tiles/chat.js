'use strict'

function ChatTile (pos = { x: 0, y: 0, z: -1 }, stack = []) {
  Event.call(this, 'chat', pos)

  this.sprite.color = 'cyan'

  this.isBlocker = true

  this.onCollision = function (e) {
    this.stage.dialog.say('hello')
  }
}
