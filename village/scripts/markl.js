'use strict'

const SPEED = {
  camera: 35,
  turn: 400
}

const RENDER = {
  tile: { w: 80, h: 85 },
  viewport: { w: 720, h: 380 }
}

const INPUT = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
  special: 'special'
}

const DEBUG = {
  bounds: true
}

function Markl () {
  GameObject.call(this, 'markl', 'div')

  this.control = new Control(this)
  this.control.install(this.el)
  this.stage = new Stage(this)
  this.stage.install(this.el)
  this.renderer = new Renderer(this)
  this.renderer.install(this.el)
  this.assets = new Assets(this)

  this.offset = new Date().getTime()
  this.timer = null
  this.drawer = null

  this.setup = function () {
    this.el.style.width = `${RENDER.viewport.w}px`
    this.el.style.height = `${RENDER.viewport.h}px`
    this.assets.setup([
      'level/garden/floor/warp',
      'level/garden/floor/safe',
      'level/garden/floor/flip',
      'level/garden/floor/spin',
      'events/blockers/stairs',
      'level/garden/floor/1',
      'level/garden/floor/2',
      'level/garden/floor/3',
      'npc/favo',
      'character/lancer/default'
    ], markl.start)
  }

  this.start = function () {
    console.log(this.id, 'Start')

    this.stage.start()
    this.control.start()

    this.timer = setInterval(() => { this.run() }, SPEED.turn)
    this.drawer = setInterval(() => { this.stage.camera.update() }, SPEED.camera)
  }

  this.stop = function () {
    clearInterval(this.timer)
  }

  this.run = function () {
    if (this.control.isPlaying !== true) { return }
    if (this.control.isPaused !== false) { return }

    this.offset = new Date().getTime()
    this.stage.run()
  }

  this.elapsed = function () {
    return new Date().getTime() - this.offset
  }
}
