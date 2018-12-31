function _tower () {
  const level = new Level('tower',
    [
      // -1
      [
        [new Floor(1), new Floor(1), new Floor(1), new Floor(1), new Floor(1)],
        [new Floor(3), new Floor(3), new Safe(), new Floor(1), new Floor(1)],
        [new Warp('lobby', { x: 4, y: -2, z: 0 }), new Floor(2), new Floor(3), new Floor(1), new Floor(1)],
        [new Floor(2), new Floor(1), new Floor(1), new Floor(1), new Floor(1)],
        [new Floor(2), new Floor(1), new Floor(1), new Floor(1), new Floor(1)]
      ]
    ])

  //
  const npc = new ActionNPC({ x: 2, y: 0, z: 0 })
  level.events.push(npc)
  return level
}
