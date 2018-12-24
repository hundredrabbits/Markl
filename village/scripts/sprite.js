'use strict'

function Sprite (host) {
  GameObject.call(this, 'sprite')

  this.color = host.color

  this.rect = function (camera) {
    return {
      x: camera.pos.x + (host.pos.x * RENDER.tile.w),
      y: camera.pos.y + (-host.pos.y * RENDER.tile.h),
      w: RENDER.tile.w,
      h: RENDER.tile.h
    }
  }
}
