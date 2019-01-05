'use strict'

function Renderer (markl) {
  GameObject.call(this, 'renderer', 'canvas')

  this.setup = function () {
    this.el.width = RENDER.viewport.w
    this.el.height = RENDER.viewport.h
    this.context = this.el.getContext('2d')
  }

  this.start = function () {
    console.log(this.id, 'Start')
  }

  this.clear = function () {
    this.context.clearRect(0, 0, this.el.width, this.el.height)
  }

  this.draw = function () {
    this.clear()
    this.drawSprites(-1)
    this.drawSprites(0)
    if (markl.control.isPlaying === false) {
      this.drawGuide()
    }
  }

  this.drawSprites = function (z = 0) {
    this.viewport()
    this.drawText({ x: 10, y: 20 }, `${markl.stage.camera.pos.x},${markl.stage.camera.pos.y}`)
    // for (const id in markl.stage.level.events) {
    //   if (markl.stage.level.events[id].pos.z !== z) { continue }
    //   this.drawSprite(markl.stage.level.events[id].sprite)
    // }
    // if (markl.stage.player.pos.z === z) {
    //   this.drawSprite(markl.stage.player.sprite)
    // }
  }

  this.viewport = function () {
    const tile = { w: RENDER.tile.w / 5, h: RENDER.tile.h / 5 }
    const center = { w: 10, h: 10 }
    const pad = { w: 4, h: 4 }
    const offset = { x: tile.w * pad.w + 30, y: -tile.h * pad.h - 30 }

    const cam = markl.stage.camera.pos
    const focus = {
      x: (cam.x % (tile.w * center.w)) + offset.x,
      y: (-cam.y % (tile.h * center.h)) - offset.y
    }

    for (let _y = -pad.h; _y < center.h + (pad.h); _y++) {
      for (let _x = -pad.w; _x < center.w + (pad.w); _x++) {
        let isReal = _y >= 0 && _y < center.h && _x >= 0 && _x < center.w
        let inSight = this.inSight({ x: _x, y: _y }, cam)
        let x = (_x * tile.w)
        let y = (_y * tile.h)
        if (inSight) {
          this.drawRect({ x: x + offset.x, y: y - offset.y, w: tile.w - 1, h: tile.h - 1 }, 'pink')
        }
        this.strokeRect({ x: x + offset.x, y: y - offset.y, w: tile.w - 1, h: tile.h - 1 }, isReal ? 'black' : '#999')
      }
    }

    this.drawTarget(focus, 'red')
  }

  this.inSight = function (pos) {
    const sight = { w: 5, h: 3 }
    const center = { w: 10, h: 10 }
    const tile = { w: RENDER.tile.w / 5, h: RENDER.tile.h / 5 }
    const cam = { x: (markl.stage.camera.pos.x / tile.w) % center.w, y: -(markl.stage.camera.pos.y / tile.h) % center.h }
    if (pos.x < cam.x - sight.w) { return false }
    if (pos.x > cam.x + sight.w) { return false }
    if (pos.y < cam.y - sight.h) { return false }
    if (pos.y > cam.y + sight.h) { return false }
    return true
  }

  this.viewport_old = function () {
    const sight = { w: 10, h: 6 }
    const tile = { w: RENDER.tile.w / 5, h: RENDER.tile.h / 5 }
    const viewport = { x: 0, y: 0, w: tile.w * sight.w, h: tile.h * sight.h }
    const cam = markl.stage.camera.pos
    const offset = { x: tile.h - 200, y: tile.h - 200 }

    for (let _y = 0; _y < sight.h; _y++) {
      for (let _x = 0; _x < sight.w; _x++) {
        let x = ((_x * tile.w) + (cam.x)) % viewport.w
        let y = ((_y * tile.h) + (cam.y)) % viewport.h
        const id = { x: (sight.w - _x), y: (sight.h - _y) }
        this.strokeRect({ x: x - offset.x, y: y - offset.y, w: tile.w - 1, h: tile.h - 1 }, id.x % 5 === 0 && id.y % 5 === 0 ? 'red' : 'blue')
        this.drawText({ x: x - offset.x, y: y - offset.y }, `${id.x + id.y}`, 'black')
      }
    }
  }

  this.drawSprite = function (sprite) {
    sprite.draw(this.context, markl.stage.camera)
  }

  this.drawGuide = function () {
    if (markl.control.stack.length < 1) { return }

    const vertices = []

    vertices.push(this.posToPixel(markl.stage.player.pos))

    let pos = addPos(markl.stage.player.pos, toVector(markl.control.stack[0]))
    vertices.push(this.posToPixel(pos))

    if (markl.control.stack.length > 1) {
      pos = addPos(pos, toVector(markl.control.stack[1]))
      vertices.push(this.posToPixel(pos))
    }
    if (markl.control.stack.length > 2) {
      pos = addPos(pos, toVector(markl.control.stack[2]))
      vertices.push(this.posToPixel(pos))
    }
    if (markl.control.stack.length > 3) {
      pos = addPos(pos, toVector(markl.control.stack[3]))
      vertices.push(this.posToPixel(pos))
    }
    if (markl.control.stack.length > 4) {
      pos = addPos(pos, toVector(markl.control.stack[4]))
      vertices.push(this.posToPixel(pos))
    }

    this.drawLine(vertices)
  }

  this.drawLine = function (vertices = [], style = '#f00') {
    this.context.beginPath()
    this.context.moveTo(vertices[0].x, vertices[0].y)
    for (const id in vertices) {
      this.context.lineTo(vertices[id].x, vertices[id].y)
    }
    this.context.strokeStyle = style
    this.context.stroke()
  }

  this.drawCircle = function (rect, style) {
    this.context.beginPath()
    this.context.fillStyle = style
    this.context.arc(rect.x + (rect.w / 2), rect.y + (rect.h / 2), rect.w / 2, 0, 2 * Math.PI, false)
    this.context.fill()
    this.context.closePath()
  }

  this.drawRect = function (rect, style) {
    this.context.fillStyle = style
    this.context.fillRect(parseInt(rect.x), parseInt(rect.y), parseInt(rect.w), parseInt(rect.h))
  }

  this.strokeRect = function (rect, style) {
    this.context.strokeStyle = style
    this.context.strokeRect(parseInt(rect.x), parseInt(rect.y), parseInt(rect.w), parseInt(rect.h))
  }

  this.drawText = function (rect, text, style) {
    this.context.font = '11px Courier'
    this.context.fillStyle = style
    this.context.fillText(text, rect.x, rect.y)
  }

  this.drawTarget = function (rect, style, size = 5) {
    this.context.fillStyle = style
    this.context.fillRect(parseInt(rect.x - (size / 2)), parseInt(rect.y - (size / 2)), size, size)
  }

  this.posToPixel = function (pos) {
    return {
      x: (pos.x * RENDER.tile.w) + markl.stage.camera.pos.x + (RENDER.tile.w / 2),
      y: (-pos.y * RENDER.tile.h) + markl.stage.camera.pos.y + (RENDER.tile.h / 2)
    }
  }

  function clamp (v, min, max) {
    return v < min ? min : v > max ? max : v
  }
}
