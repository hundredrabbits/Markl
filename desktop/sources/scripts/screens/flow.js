'use strict'

function Flow () {
  this.el = document.createElement('div')
  this.el.id = 'flow'

  this.active = 'splash'
  this.screens = {}

  this.install = function (host) {
    const screens = {
      'splash': new SplashScreen(),
      'fighter': new FighterScreen(),
      'stage': new StageScreen(),
      'arena': new ArenaScreen()
    }
    for (const id in screens) {
      this.screens[id] = screens[id]
      this.screens[id].install(this.el)
    }

    host.appendChild(this.el)
  }

  this.start = function () {
    for (const id in this.screens) {
      this.screens[id].start()
      this.active = id
    }
    this.goto('splash')
  }

  this.update = function () {

  }

  this.run = function () {
    console.log(`Flow: Running screen #${this.active}`)
    this.screens[this.active].run()
    markl.interface.update()
  }

  this.goto = function (screen_id) {
    if (!this.screens[screen_id]) { console.warn(`Unknown screen: ${screen_id}`); return }

    this.screens[this.active].hide()
    this.active = screen_id
    this.screens[this.active].show()
    this.run()
  }

  this.reset = function () {
    for (const id in this.screens) {
      this.screens[id].reset()
    }
  }
}

module.exports = Flow
