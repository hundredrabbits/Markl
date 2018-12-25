'use strict'

function Event (id, pos = { x: 0, y: 0, z: 0 }) {
  GameObject.call(this, id)

  this.pos = pos
  this.sprite = new Sprite(this)

  this.isBlocker = false

  this.start = function () {
    this.stage = markl.stage
  }

  this.run = function () {

  }

  this.move = function (pos) {
    const mod = this.mod(pos, this.effect)
    const collider = this.stage.colliderAt({ x: this.pos.x + mod.x, y: this.pos.y + mod.y }, this.pos.z, this)

    if (collider) {
      collider.onCollision(this)
    }

    if (!collider || collider.isBlocker !== true) {
      this.pos.x += mod.x
      this.pos.y += mod.y
    }
  }

  this.moveTo = function (pos) {
    this.pos = pos
  }

  this.mod = function (pos, effect = this.pos.effect) {
    if (!effect) { return pos }
    pos.x = pos.x * effect.x
    pos.y = pos.y * effect.y
    return pos
  }

  this.onStep = function (e) {

  }

  this.onCollision = function (e) {

  }

  this.hasPos = function (pos, depth = false) {
    return pos.x === this.pos.x && pos.y === this.pos.y
  }

  this.toString = function () {
    return `${this.id}`
  }
}
