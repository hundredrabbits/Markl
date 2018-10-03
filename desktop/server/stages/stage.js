'use strict'

function Stage () {
  this.bounds = { x: 4, y: 4 }
  this.fighters = []

  function events_at (pos, stage) {
    const e = []
    for (const id in stage.fighters) {
      const fighter = stage.fighters[id]
      if (!fighter.is_visible) { continue }
      if (fighter.pos.x != pos.x || fighter.pos.y != pos.y) { continue }
      e.push(fighter)
    }
    return e
  }

  function find_sights (pos, stage) {
    const origin = pos
    const sights = []

    for (let x = 1; x < 10; x++) {
      const events = events_at({ x: pos.x + x, y: pos.y }, stage)
      for (const id in events) {
        sights.push(events[id])
      }
    }
    for (let x = -1; x > -10; x--) {
      const events = events_at({ x: pos.x + x, y: pos.y }, stage)
      for (const id in events) {
        sights.push(events[id])
      }
    }
    for (let y = 1; y < 10; y++) {
      const events = events_at({ x: pos.x, y: pos.y + y }, stage)
      for (const id in events) {
        sights.push(events[id])
      }
    }
    for (let y = -1; y > -10; y--) {
      const events = events_at({ x: pos.x, y: pos.y + y }, stage)
      for (const id in events) {
        sights.push(events[id])
      }
    }
    return sights
  }

  this.triggers = function (host) {
    const sights = find_sights(host.pos, this)
    const h = {}
    for (const id in sights) {
      const sight = sights[id]
      let sight_type = sight.type.toUpperCase()
      let sight_name = sight.name.toUpperCase()
      let sight_distance = distance(host.pos, sight.pos)
      if (!h['SIGHT']) { h['SIGHT'] = {} }
      if (!h['SIGHT'][sight_type]) { h['SIGHT'][sight_type] = {} }
      h['SIGHT'][sight_type]['ANY'] = sight
      h['SIGHT'][sight_type][`DISTANCE IS ${sight_distance}`] = sight
      h['SIGHT'][sight_type][`NAME IS ${sight_name}`] = sight
    }
    return h
  }

  this.serialize = function () {
    const fighters = []
    for (const id in this.fighters) {
      const fighter = this.fighters[id]
      fighters.push({
        id: fighter.id,
        name: fighter.name,
        pos: { x: fighter.pos.x, y: fighter.pos.y },
        status: fighter.status,
        hp: fighter.hp,
        sp: fighter.sp,
        tp: fighter.tp,
        score: fighter.score
      })
    }
    return { fighters: fighters }
  }

  function distance (a, b) {
    if (a.x == b.x && a.y == b.y) { return 0 } // Same tile
    if (a.x != b.x && a.y != b.y) { return null } // No aligned
    if (Math.abs(a.x - b.x) > 0) { return Math.abs(a.x - b.x) }
    if (Math.abs(a.y - b.y) > 0) { return Math.abs(a.y - b.y) }
  }
}

module.exports = Stage
