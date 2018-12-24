'use strict'

function Stage () {
  GameObject.call(this, 'stage', 'canvas')

  this.events = []
  this.player = new Player()
  this.focus = { x: 0, y: 0 }

  this.setup = function () {
    this.el.width = RENDER.viewport.w
    this.el.height = RENDER.viewport.h
    this.context = this.el.getContext('2d')

    this.focus = { x: RENDER.viewport.w / 2, y: RENDER.viewport.h / 2 }
  }

  this.start = function () {
    console.log(this.id, 'Start')
    this.addEvent(this.player)
    this.update()
  }

  this.addEvent = function (event) {
    this.events.push(event)
  }

  this.clear = function () {
    this.context.clearRect(0, 0, this.el.width, this.el.height)
  }

  this.draw = function () {
    this.clear()
    this.drawSprites()
  }

  this.drawSprites = function () {
    for (const id in this.events) {
      this.drawSprite(this.events[id].sprite)
    }
  }

  this.drawSprite = function (sprite) {
    const ctx = this.context
    const rect = sprite.rect(this.focus)
    const clr = sprite.color

    ctx.fillStyle = clr
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
  }

  this.update = function () {
    this.draw()
  }
}
