'use strict'

function addPos (a, b) {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }
}

function toVector (key) {
  if (key === INPUT.up) { return { x: 0, y: 1, z: 0 } }
  if (key === INPUT.down) { return { x: 0, y: -1, z: 0 } }
  if (key === INPUT.left) { return { x: -1, y: 0, z: 0 } }
  if (key === INPUT.right) { return { x: 1, y: 0, z: 0 } }
  if (key === INPUT.special) { return { x: 0, y: 0, z: 0 } }
  return null
}
