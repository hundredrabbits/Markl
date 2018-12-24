'use strict'

function Camera (stage) {
  GameObject.call(this, 'camera')

  this.pos = { x: 0, y: 0 }

  this.update = function () {
    const center = { x: (RENDER.viewport.w / 2) - (RENDER.tile.w / 2), y: (RENDER.viewport.h / 2) - (RENDER.tile.h / 2) }

    this.pos.x = center.x - (stage.player.pos.x * RENDER.tile.w)
    this.pos.y = center.y + (stage.player.pos.y * RENDER.tile.h)
  }
}
