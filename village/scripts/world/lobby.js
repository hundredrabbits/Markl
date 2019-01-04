function _lobby () {
  const level = new Level('lobby',
    [
      // -1
      [
        [new Floor(2), new Floor(1), new Floor(1), new Floor(1), new Floor(1)],
        [new Floor(3), new Floor(3), new Floor(2), new Floor(1), new Warp('forest', { x: 0, y: -2, z: 0 })],
        [new Floor(1), new Floor(2), new Safe(), new Floor(1), new Floor(1)],
        [new Floor(2), new Floor(1), new Floor(1), new Floor(1), new Floor(1)],
        [new Floor(2), new Floor(1), new Floor(1), new Floor(1), new Floor(1)]
      ]
      // 0
    ]
  )

  level.events.push(new Stairs({ x: 1, y: -2, z: 0 }))

  return level
}
