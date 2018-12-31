function _fork () {
  const level = new Level('fork',
    [
      // -1
      [
        [null, new Spin(1), null],
        [new Spin(3), new Floor(3), new Spin()],
        [null, new Safe(), null]
      ]
    ])

  return level
}
