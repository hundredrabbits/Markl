'use strict'

function Level (name, events) {
  this.name = name
  this.size = { w: events[0].length, h: events.length }
  this.events = []

  this.start = function () {
    // Locate
    for (const y in events) {
      const row = events[y]
      for (const x in events[y]) {
        const event = events[y][x]
        event.pos = { x: x, y: -y, z: -1 }
        event.level = this
        this.events.push(event)
      }
    }
    // console.log(this.events)
    // Start
    for (const id in this.events) {
      this.events[id].start()
    }
  }

  this.addEvent = function (event) {
    this.events.push(event)
  }
}
