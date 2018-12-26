'use strict'

function Stage (markl) {
  GameObject.call(this, 'stage', 'canvas')

  this.world = new World(this)
  this.camera = new Camera(this)
  this.dialog = new Dialog(this)

  this.player = new Player({ x: 8, y: -4, z: 0 })
  this.player.stage = this

  this.level = null

  this.setup = function () {
    this.player.control = markl.control
    this.player.install(markl.el)
    this.dialog.install(markl.el)

    this.el.width = RENDER.viewport.w
    this.el.height = RENDER.viewport.h
    this.context = this.el.getContext('2d')

    this.focus = { x: RENDER.viewport.w / 2, y: RENDER.viewport.h / 2 }
  }

  this.start = function () {
    console.log(this.id, 'Start')
    this.enter('lobby', { x: 8, y: -4, z: 0 })
    this.camera.moveTo(this.player.pos)
    this.update()
  }

  this.run = function () {
    this.camera.focus(this.player.sprite.pos())
    for (const id in this.level.events) {
      if (!this.level.events[id]) { continue }
      this.level.events[id].run()
    }
    this.player.run()
    this.update()
  }

  this.update = function () {
    markl.control.update()
    this.dialog.update()
    this.player.update()
    this.draw()
  }

  this.enter = function (id, pos = { x: 0, y: 0, z: 0 }) {
    if (!this.world.storage[id]) { console.warn(`Unknown level: ${id}`); return }
    console.info(this.id, `Entering ${id} ${pos.x},${pos.y}`)
    this.level = this.world.storage[id]
    this.level.start()

    this.player.moveTo(pos)
    this.camera.moveTo(pos)
  }

  this.clear = function () {
    this.context.clearRect(0, 0, this.el.width, this.el.height)
  }

  this.undo = function () {
    console.log('undo')
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
      x: this.camera.pos.x,
      y: this.camera.pos.y,
      w: this.level.size.w * RENDER.tile.w,
      h: this.level.size.h * RENDER.tile.h
    }
    this.drawRect(rect, '#ccc')
  }

  this.drawSprites = function (z = 0) {
    for (const id in this.level.events) {
      if (this.level.events[id].pos.z !== z) { continue }
      this.drawSprite(this.level.events[id].sprite)
    }
    if (this.player.pos.z === z) {
      this.drawSprite(this.player.sprite)
    }
  }

  this.drawSprite = function (sprite) {
    const rect = sprite.rect(this.camera)

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

    vertices.push(this.posToPixel(this.player.pos))

    let pos = addPos(this.player.pos, toVector(markl.control.stack[0]))
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

  this.tileAt = function (pos) {
    for (const id in this.level.events) {
      const event = this.level.events[id]
      if (event.pos.z !== -1) { continue }
      if (!event.hasPos(pos)) { continue }
      return event
    }
    return null
  }

  this.colliderAt = function (pos, z = 0, skip = null) {
    for (const id in this.level.events) {
      const event = this.level.events[id]
      if (event.pos.z !== z) { continue }
      if (event.id === skip.id) { continue }
      if (!event.hasPos(pos)) { continue }
      return event
    }
    return null
  }

  this.posToPixel = function (pos) {
    return {
      x: (pos.x * RENDER.tile.w) + this.camera.pos.x + (RENDER.tile.w / 2),
      y: (-pos.y * RENDER.tile.h) + this.camera.pos.y + (RENDER.tile.h / 2)
    }
  }

  this.inBounds = function (pos) {
    return pos.x < this.level.size.w && pos.x >= 0 && -pos.y < this.level.size.h && -pos.y >= 0
  }

  function addPos (a, b) {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }
  }

  function toVector (key) {
    if (key === INPUT.up) { return { x: 0, y: 1, z: 0 } }
    if (key === INPUT.down) { return { x: 0, y: -1, z: 0 } }
    if (key === INPUT.left) { return { x: -1, y: 0, z: 0 } }
    if (key === INPUT.right) { return { x: 1, y: 0, z: 0 } }
    if (key === INPUT.special) { return { x: 0, y: 0, z: 0 } }
    return null
  }
}
