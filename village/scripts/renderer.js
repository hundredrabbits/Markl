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
    this.drawFloor()
    this.drawSprites(-1)
    this.drawSprites(0)
    if (markl.control.isPlaying === false) {
      this.drawGuide()
    }
  }

  this.drawFloor = function () {
    const rect = {
      x: markl.stage.camera.pos.x,
      y: markl.stage.camera.pos.y,
      w: markl.stage.level.size.w * RENDER.tile.w,
      h: markl.stage.level.size.h * RENDER.tile.h
    }
    this.drawRect(rect, '#ccc')
  }

  this.drawSprites = function (z = 0) {
    for (const id in markl.stage.level.events) {
      if (markl.stage.level.events[id].pos.z !== z) { continue }
      this.drawSprite(markl.stage.level.events[id].sprite)
    }
    if (markl.stage.player.pos.z === z) {
      this.drawSprite(markl.stage.player.sprite)
    }
  }

  this.drawSprite = function (sprite) {
    const rect = sprite.rect(markl.stage.camera)

    if (sprite.host.pos.z === -1) {
      this.drawRect(rect, sprite.color)
    } else {
      this.drawCircle(rect, sprite.color)
    }
    this.drawText(rect, `${sprite.host}`, 'black')
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

  this.drawText = function (rect, text, style) {
    this.context.font = '20px Georgia'
    this.context.fillStyle = style
    this.context.fillText(text, rect.x, rect.y)
  }

  this.posToPixel = function (pos) {
    return {
      x: (pos.x * RENDER.tile.w) + markl.stage.camera.pos.x + (RENDER.tile.w / 2),
      y: (-pos.y * RENDER.tile.h) + markl.stage.camera.pos.y + (RENDER.tile.h / 2)
    }
  }
}
