'use strict'

function World (stage) {
  GameObject.call(this, 'world')

  this.storage = {
    lobby: [
      new SaveTile({ x: 0, y: 0, z: -1 }),
      new Blocker({ x: 0, y: -2, z: 0 }),
      new MirrorXTile({ x: 2, y: -2, z: -1 }),
      new SaveTile({ x: 0, y: -4, z: -1 }),
      new MirrorXTile({ x: 2, y: -7, z: -1 }),
      new OverrideTile({ x: -2, y: -11, z: -1 }, [INPUT.up]),
      new SaveTile({ x: -6, y: -2, z: -1 }),
      new WarpTile({ x: 2, y: 0, z: -1 }, 'forest', { x: 0, y: 0, z: 0 })
    ],
    forest: [
      new HoleTile({ x: -2, y: 0, z: -1 }, 'forest', { x: 0, y: 0 }),
      new WarpTile({ x: 2, y: 0, z: -1 }, 'forest', { x: 0, y: 0 })
    ]
  }

  this.enter = function (id, pos = { x: 0, y: 0, z: 0 }) {
    console.info(this.id, `Entering ${id}`)
    stage.events = []
    stage.player.moveTo(pos)
    stage.addEvent(stage.player)
    for (const i in this.storage[id]) {
      stage.addEvent(this.storage[id][i])
    }
  }

  this.load = function (id) {
    console.info(this.id, `Loading ${id}`)

    stage.addEvent(stage.player)

    for (const i in lobby) {
      stage.addEvent(lobby[i])
    }
  }
}
