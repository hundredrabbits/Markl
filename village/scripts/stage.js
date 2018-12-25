'use strict'

function Stage (markl) {
  GameObject.call(this, 'stage', 'canvas')

  this.world = new World(this)
  this.camera = new Camera(this)
  this.dialog = new Dialog(this)

  this.player = new Player({ x: 0, y: 0, z: 0 })
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
    this.camera.focus()
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
    console.info(this.id, `Entering ${id}`)
    this.level = this.world.storage[id]
    this.level.start()

    this.player.moveTo(pos)
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
}
