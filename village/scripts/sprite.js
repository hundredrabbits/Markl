'use strict'

function Sprite (host) {
  GameObject.call(this, 'sprite')

  this.color = host.color

  this.rect = function (offset = { x: 0, y: 0 }) {
    return {
      x: offset.x - (RENDER.tile.w / 2) + (host.pos.x * RENDER.tile.w),
      y: offset.y - (RENDER.tile.h / 2) + (host.pos.y * RENDER.tile.h),
      w: RENDER.tile.w,
      h: RENDER.tile.h
    }
  }
}
