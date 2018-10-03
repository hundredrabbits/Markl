'use strict'

function Sprite (type, id) {
  this.canvas = document.createElement('canvas')

  this.el = document.createElement('sprite')
  this.el.appendChild(this.canvas)

  this.pos = { x: 0, y: 0 }
  this.fighter = ''
  this.status = ''
  this.vector = ''

  this.path = null
  this.spritesheet = new Image()

  let STAGE = { padding: { x: 15, y: 15 }, tile: 80 }

  this.load = function (path) {
    this.path = path
    this.spritesheet.src = path

    this.spritesheet.onload = function (path) {
      console.log(`Spritesheet loaded:${path}`, this.width, this.height)
    }
  }

  this.setup = function (h) {
    this.load(`./media/fighters/${h.fighter}.png`)

    this.el.style.transition = `all ${TIMING.sprite}ms`
    this.el.style.width = `${STAGE.tile}px`
    this.el.style.height = `${STAGE.tile}px`

    this.canvas.width = STAGE.tile * 1.5
    this.canvas.height = STAGE.tile * 1.5
    this.to(h.pos)
  }

  this.to = function (pos) {
    this.pos = pos
    this.el.style.transform = `translate(${pos.x * STAGE.tile}px, ${pos.y * STAGE.tile}px)`
  }

  this.animate_to = function (pos) {
    this.to(pos)
  }

  this.set_status = function (s) {
    this.status = s
  }

  this.set_fighter = function (c) {
    this.fighter = c
  }

  this.set_vector = function (v) {
    this.vector = v
  }

  this.update = function () {
    this.el.className = `depth${this.pos.y} ${this.fighter} ${this.status} ${this.vector ? this.vector : ''}`
    this.draw()
  }

  // Canvas stuff

  this.context = function () {
    return this.canvas.getContext('2d')
  }

  this.clear = function () {
    this.context().clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  this.assoc = {
    idle: 0,
    move: 1,
    dash: 4,
    attack: 7,
    fire: 7,
    hit: 0,
    kill: 0,
    recovery: 0,
    taunt: 0,
    stasis: 0,
    dead: 13
  }

  this.draw = function () {
    this.clear()

    var width = parseInt(this.spritesheet.naturalWidth) * 0.5
    var height = parseInt(this.spritesheet.naturalHeight) * 0.5
    var x = 0
    var y = this.assoc[this.status] ? this.assoc[this.status] * (STAGE.tile * -1.5) : 0

    console.log(this.assoc[this.status], this.status)
    console.log(this.status, this.fighter, this.vector, y)

    this.context().drawImage(this.spritesheet, x, y, width, height)
  }
}
