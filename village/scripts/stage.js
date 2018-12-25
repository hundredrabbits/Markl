'use strict'

function Stage (markl) {
  GameObject.call(this, 'stage', 'canvas')

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
    this.addEvent(this.player)
    this.addEvent(new SaveTile({ x: 0, y: 0, z: -1 }))
    this.addEvent(new Blocker({ x: 0, y: -2, z: 0 }))
    this.addEvent(new MirrorXTile({ x: 2, y: -2, z: -1 }))
    this.addEvent(new SaveTile({ x: 0, y: -4, z: -1 }))
    this.addEvent(new MirrorXTile({ x: 2, y: -7, z: -1 }))
    this.addEvent(new OverrideTile({ x: -2, y: -11, z: -1 }, [INPUT.up]))
    this.addEvent(new SaveTile({ x: -6, y: -2, z: -1 }))

    // NPC section
    this.addEvent(new Blocker({ x: 0, y: 2, z: 0 }))
    this.addEvent(new Blocker({ x: -1, y: 1, z: 0 }))
    this.addEvent(new Blocker({ x: 1, y: 1, z: 0 }))
    this.addEvent(new ChatTile({ x: 0, y: 1, z: 0 }, 'Hello Traveler!'))

    // Loop
    this.addEvent(new Blocker({ x: -1, y: -4, z: 0 }))
    this.addEvent(new SaveTile({ x: -4, y: -4, z: -1 }, [INPUT.up]))
    this.addEvent(new Blocker({ x: -3, y: -4, z: 0 }))
    this.addEvent(new Blocker({ x: -2, y: -5, z: 0 }))
    this.addEvent(new ChatTile({ x: -5, y: -4, z: 0 }, 'You made it.'))

    this.camera.focus(this.player.pos)
    this.update()
  }

  this.run = function () {
    this.camera.focus(this.player.pos)
    for (const id in this.events) {
      this.events[id].run()
    }
    this.update()
  }

  this.update = function () {
    markl.control.update()
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
    const ctx = this.context
    const rect = sprite.rect(this.camera)
    const clr = sprite.color

    ctx.fillStyle = clr
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
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
