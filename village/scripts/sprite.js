'use strict'

function Sprite (host) {
  GameObject.call(this, 'sprite')

  this.color = host.color

  this.rect = function (camera) {
    const pad = host.pos.z === 0 ? 10 : 0
    return {
      x: camera.pos.x + (host.pos.x * RENDER.tile.w) + (pad / 2),
      y: camera.pos.y + (-host.pos.y * RENDER.tile.h) + (pad / 2),
      w: RENDER.tile.w - pad,
      h: RENDER.tile.h - pad
    }
  }
}
