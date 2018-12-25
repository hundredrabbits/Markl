'use strict'

function World (stage) {
  GameObject.call(this, 'world')

  function _lobby () {
    return new Level('lobby', { x: 0, y: 0, w: 16, h: 12 }, [
      // Tiles
      new SafeTile({ x: 8, y: -4, z: -1 }),
      new SafeTile({ x: 8, y: -8, z: -1 }),
      new MirrorXTile({ x: 10, y: -6, z: -1 }),
      new MirrorXTile({ x: 6, y: -6, z: -1 }),
      new OverrideTile({ x: 6, y: -2, z: -1 }, [INPUT.up]),
      new WarpTile({ x: 10, y: -4, z: -1 }, 'forest', { x: 0, y: 0, z: 0 }),
      new WarpTile({ x: 10, y: -8, z: -1 }, 'sewers', { x: 0, y: 0, z: 0 }),
      // Events
      new Chat({ x: 8, y: -3, z: 0 }, 'Hello Traveler'),
      new Blocker({ x: 8, y: -6, z: 0 })
    ])
  }

  function _forest () {
    return new Level('forest', { w: 5, h: 5 }, [
      new HoleTile({ x: 4, y: 0, z: -1 }),
      new WarpTile({ x: 0, y: 0, z: -1 }, 'lobby', { x: 8, y: -4, z: 0 })
    ])
  }

  function _sewers () {
    return new Level('sewers', { w: 8, h: 5 }, [
      new WarpTile({ x: 0, y: 0, z: -1 }, 'lobby', { x: 10, y: -8, z: 0 }),
      new SafeTile({ x: 1, y: 0, z: -1 })
    ])
  }

  this.storage = {
    lobby: _lobby(),
    forest: _forest(),
    sewers: _sewers()
  }
}
