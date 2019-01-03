'use strict'

function Level (name, events) {
  this.name = name
  this.size = { w: events[0][0].length, h: events[0].length }
  this.events = []

  this.start = function () {
    // Locate
    for (const _z in events) {
      const z = parseInt(_z)
      for (const _y in events[z]) {
        const y = parseInt(_y)
        const row = events[z][y]
        for (const _x in events[z][y]) {
          const x = parseInt(_x)
          const event = events[z][y][x]
          if (!event) { continue }
          event.install(this,{ x: x, y: -y, z: z - 1 })
          this.events.push(event)
        }
      }
    }
    // Start
    for (const id in this.events) {
      this.events[id].start()
    }
  }

  this.addEvent = function (event) {
    this.events.push(event)
  }
}
