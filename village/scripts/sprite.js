'use strict'

function Sprite (host, asset = 'level/garden/floor/2') {
  GameObject.call(this, 'sprite')

  this.size = { w: 1, h: 1 }
  this.offset = { x: 0, y: 0 }
  this.asset = asset
  this.host = host
  this.color = host.color
  this.ratio = 855 / 800

  this.rect = function (camera, absolute = false) {
    const transPos = this.pos()
    const vert = transPos.y * ((RENDER.tile.h - RENDER.tile.w) * 1.5)
    return {
      x: camera.pos.x + (transPos.x * RENDER.tile.w) + (!absolute ? this.offset.x * RENDER.tile.w : 0),
      y: camera.pos.y + (-transPos.y * RENDER.tile.h) + vert + (!absolute ? this.offset.y * RENDER.tile.w : 0),
      w: RENDER.tile.w * (!absolute ? this.size.w : 1),
      h: RENDER.tile.w * (!absolute ? this.size.h : 1) * this.ratio
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
    const img = markl.assets.get(this.asset)
    if (!img) { return }
    if (DEBUG.bounds) {
      this.debug(context, camera)
    }
    context.drawImage(img, rect.x, rect.y, rect.w, rect.h)
  }

  this.debug = function (context, camera) {
    let rect = this.rect(camera)
    context.strokeStyle = 'red'
    context.strokeRect(parseInt(rect.x), parseInt(rect.y), parseInt(rect.w), parseInt(rect.h))
    rect = this.rect(camera, true)
    context.strokeStyle = this.host.pos.z === 1 ? 'yellow' : 'blue'
    context.strokeRect(parseInt(rect.x), parseInt(rect.y), parseInt(rect.w), parseInt(rect.h))
  }

  function clamp (v, min, max) { return v < min ? min : v > max ? max : v }
}
