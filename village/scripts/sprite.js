'use strict'

function Sprite (host) {
  GameObject.call(this, 'sprite')

  this.host = host
  this.color = host.color

  this.rect = function (camera) {
    const transPos = this.pos()

    const pad = host.pos.z === 0 ? 10 : 0
    return {
      x: camera.pos.x + (transPos.x * RENDER.tile.w) + (pad / 2),
      y: camera.pos.y + (-transPos.y * RENDER.tile.h) + (pad / 2),
      w: RENDER.tile.w - pad,
      h: RENDER.tile.h - pad
    }
  }

  this.pos = function () {
    if (!host.pos.prev) { return host.pos }

    const progress = this.elapsedRatio()

    if (progress === 0) {
      // host.pos.prev = host.pos
    }
    return {
      x: host.pos.prev.x + (progress * (host.pos.x - host.pos.prev.x)),
      y: host.pos.prev.y + (progress * (host.pos.y - host.pos.prev.y))
    }
  }

  this.elapsedRatio = function () {
    return clamp(markl.elapsed() / SPEED.turn, 0, 1)
  }

  this.draw = function (context, camera) {
    const rect = this.rect(camera)
    context.drawImage(markl.assets.get('level/garden/floor/2'), rect.x, rect.y, rect.w, rect.h)
  }

  function clamp (v, min, max) { return v < min ? min : v > max ? max : v }
}
