'use strict'

function Stage () {
  GameObject.call(this, 'stage', 'canvas')

  this.events = []
  this.player = new Player()

  this.setup = function()
  {
    this.el.width = 640
    this.el.height = 320
    this.context = this.el.getContext('2d')
  }

  this.start = function () {
    console.log(this.id, 'Start')
    this.addEvent(this.player)
    this.update()
  }

  this.addEvent = function(event)
  {
    this.events.push(event)
  }

  this.clear = function()
  {
    this.context.clearRect(0, 0, this.el.width, this.el.height)
  }

  this.draw = function()
  {
    this.clear()
    this.drawSprites()
  }

  this.drawSprites = function()
  {
    this.drawSprite(this.player.sprite)
  }

  this.drawSprite = function(sprite)
  {
    const ctx = this.context;
    
    ctx.fillStyle = 'red'
    ctx.fillRect(0, 0, 100, 100)
  }

  this.update = function()
  {
    this.draw()
  }
}
