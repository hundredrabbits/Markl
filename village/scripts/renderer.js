'use strict'

function Renderer (markl) {
  GameObject.call(this, 'renderer', 'canvas')

  this.setup = function () {
    this.el.width = RENDER.size.w
    this.el.height = RENDER.size.h
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
    this.drawFloor()
    // this.drawSprites(-1)
    // this.drawSprites(0)
    if (markl.control.isPlaying === false) {
      this.drawGuide()
    }
  }

  this.drawFloor = function (z = 0) {
    const sight = this.viewport()
    for(const id in sight){
      const loc = sight[id]
      const rect = loc.rect
      if(loc.real.x % 7 === 0 && loc.real.y % 3 === 0){
        this.context.drawImage(markl.assets.get(loc.real.x % 5 === 0 && loc.real.y % 5 === 0 ? 'level/sand/floor/4' :'level/sand/floor/6'), rect.x, rect.y, rect.w, rect.h)  
      }
      else if(loc.real.x % 3 === 0 && loc.real.y % 5 === 0){
        this.context.drawImage(markl.assets.get(loc.real.x % 5 === 0 && loc.real.y % 5 === 0 ? 'level/sand/floor/2' :'level/sand/floor/3'), rect.x, rect.y, rect.w, rect.h)  
      }
    }
  }

  this.drawSprites = function (z = 0) {
    const sight = this.viewport()
    for(const id in sight){
      const loc = sight[id]
    }
    this.drawText({ x: 10, y: 20 }, `${markl.stage.camera.pos.x},${markl.stage.camera.pos.y}`)
  }

  this.viewport = function () {
    const tiles = []
    const cam = markl.stage.camera.viewport
    const offset = { x: cam.x + (RENDER.size.w / 2), y: -cam.y - (RENDER.size.h / 2) }
    for (let _y = -LEVEL.pad; _y < LEVEL.size.h + (LEVEL.pad); _y++) {
      for (let _x = -LEVEL.pad; _x < LEVEL.size.w + (LEVEL.pad); _x++) {
        if (!this.inSight({ x: _x, y: _y }, cam)) { continue }
        const isReal = _y >= 0 && _y < LEVEL.size.h && _x >= 0 && _x < LEVEL.size.w
        const rect = { x: (_x * TILE.w) + offset.x, y: (_y * TILE.h) - offset.y, w: TILE.w - 1, h: TILE.h - 1 }
        const x = _x + cam.sector.x
        const y = _y + cam.sector.y
        tiles.push({rect:rect,real:{x:x,y:y,is:isReal}})
      }
    }
    return tiles
  }

  this.inSight = function (pos) {
    const sight = { w: 6, h: 4 }
    const cam = { x: -(markl.stage.camera.pos.x / TILE.w) % LEVEL.size.w, y: -(markl.stage.camera.pos.y / TILE.h) % LEVEL.size.h }
    if (pos.x < cam.x - sight.w) { return false }
    if (pos.x > cam.x + sight.w) { return false }
    if (pos.y < cam.y - sight.h) { return false }
    if (pos.y > cam.y + sight.h) { return false }
    return true
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
      x: (pos.x * TILE.w) + markl.stage.camera.pos.x + (TILE.w / 2),
      y: (-pos.y * TILE.h) + markl.stage.camera.pos.y + (TILE.h / 2)
    }
  }

  function clamp (v, min, max) {
    return v < min ? min : v > max ? max : v
  }
}
