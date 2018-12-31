'use strict'

function World (stage) {
  GameObject.call(this, 'world')

  function _sewers () {
    return new Level('sewers', { w: 8, h: 5 }, [
      new WarpTile({ x: 0, y: 0, z: -1 }, 'lobby', { x: 10, y: -8, z: 0 }),
      new SafeTile({ x: 1, y: 0, z: -1 }),
      new Blocker({ x: 2, y: 0, z: 0 }),
      new SafeTile({ x: 5, y: 0, z: -1 }),
      new Blocker({ x: 4, y: 0, z: 0 })
    ])
  }

  function _den () {
    return new Level('den', { w: 4, h: 5 }, [
      new WarpTile({ x: 3, y: 0, z: -1 }, 'lobby', { x: 10, y: -8, z: 0 }),
      new SafeTile({ x: 2, y: 0, z: -1 }),
      new Blocker({ x: 2, y: 0, z: 0 }),
      new SafeTile({ x: 5, y: 0, z: -1 }),
      new Blocker({ x: 4, y: 0, z: 0 })
    ])
  }

  this.storage = {
    lobby: _lobby(),
    forest: _forest()
    // sewers: _sewers(),
    // den: _den()
  }
}
