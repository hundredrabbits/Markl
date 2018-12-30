function _lobby () {
  return new Level('lobby',
    [
      [new Floor(1), new Floor(1), new Floor(3), new Floor(1)],
      [new Floor(3), new Floor(3), new Floor(2), new Floor(1)],
      [new Floor(1), new Floor(2), new Floor(2), new Floor(1)],
      [new Floor(2), new Floor(1), new Floor(1), new Floor(1)]
    ]
  )
}

// new SafeTile({ x: 8, y: -4, z: -1 }),
// new SafeTile({ x: 8, y: -8, z: -1 }),
// new SafeTile({ x: 4, y: -6, z: -1 }),
// new SafeTile({ x: 2, y: -8, z: -1 }),
// new MirrorXTile({ x: 10, y: -6, z: -1 }),
// new MirrorXTile({ x: 6, y: -6, z: -1 }),
// new OverrideTile({ x: 6, y: -2, z: -1 }, [INPUT.up]),
// new WarpTile({ x: 10, y: -4, z: -1 }, 'forest', { x: 0, y: 0, z: 0 }),
// new WarpTile({ x: 10, y: -8, z: -1 }, 'sewers', { x: 0, y: 0, z: 0 }),
// new WarpTile({ x: 1, y: -8, z: -1 }, 'den', { x: 3, y: 0, z: 0 }),
// // Events
// new Chat({ x: 8, y: -3, z: 0 }, 'Hello Traveler'),
// new Chat({ x: 4, y: -5, z: 0 }, 'Hello Traveler'),
// new Blocker({ x: 8, y: -6, z: 0 }),
// new Blocker({ x: 5, y: -8, z: 0 })
