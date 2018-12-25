'use strict'

function World (stage) {
  GameObject.call(this, 'world')

  function _lobby () {
    return new Level('lobby', { w: 5, h: 5 }, [
      // Tiles
      new SaveTile({ x: 0, y: 0, z: -1 }),
      new MirrorXTile({ x: 2, y: -2, z: -1 }),
      new SaveTile({ x: 0, y: -4, z: -1 }),
      new MirrorXTile({ x: 2, y: -7, z: -1 }),
      new OverrideTile({ x: -2, y: -11, z: -1 }, [INPUT.up]),
      new SaveTile({ x: -6, y: -2, z: -1 }),
      new WarpTile({ x: 2, y: 0, z: -1 }, 'forest', { x: 0, y: 0, z: 0 }),
      // Events
      new Chat({ x: 0, y: 1, z: 0 }, 'Hello'),
      new Blocker({ x: 0, y: -2, z: 0 })
    ])
  }

  function _forest () {
    return new Level('forest', { w: 5, h: 5 }, [
      new HoleTile({ x: 2, y: 0, z: -1 }, 'forest', { x: 0, y: 0 }),
      new WarpTile({ x: -1, y: 0, z: -1 }, 'forest', { x: 0, y: 0 })
    ])
  }

  this.storage = {
    lobby: _lobby(),
    forest: _forest()
  }
}
