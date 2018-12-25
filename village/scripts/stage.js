'use strict'

function Stage (markl) {
  GameObject.call(this, 'stage', 'canvas')

  this.world = new World(this)
  this.camera = new Camera(this)
  this.dialog = new Dialog(this)

  this.player = new Player({ x: 0, y: 0, z: 0 })

  this.events = []

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
    this.world.enter('lobby')
    this.camera.moveTo(this.player.pos)
    this.update()
  }

  this.run = function () {
    this.camera.focus()
    for (const id in this.events) {
      if (!this.events[id]) { continue }
      this.events[id].run()
    }
    this.update()
  }

  this.update = function () {
    markl.control.update()
    this.dialog.update()
    this.player.update()
    this.draw()
  }

  this.addEvent = function (event) {
    event.stage = this
    this.events.push(event)
  }

  this.clear = function () {
    this.context.clearRect(0, 0, this.el.width, this.el.height)
  }

  this.undo = function () {
    console.log('undo')
  }

  this.draw = function () {
    this.clear()
    this.drawSprites(-1)
    this.drawSprites(0)
  }

  this.drawSprites = function (z = 0) {
    for (const id in this.events) {
      if (this.events[id].pos.z !== z) { continue }
      this.drawSprite(this.events[id].sprite)
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
    for (const id in this.events) {
      const event = this.events[id]
      if (event.pos.z !== -1) { continue }
      if (!event.hasPos(pos)) { continue }
      return event
    }
    return null
  }

  this.colliderAt = function (pos, z = 0, skip = null) {
    for (const id in this.events) {
      const event = this.events[id]
      if (event.pos.z !== z) { continue }
      if (event.id === skip.id) { continue }
      if (!event.hasPos(pos)) { continue }
      return event
    }
    return null
  }
}
