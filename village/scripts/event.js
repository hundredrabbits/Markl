'use strict'

function Event (id, pos = { x: 0, y: 0, z: 0 }) {
  GameObject.call(this, id)

  this.pos = pos
  this.pos.prev = pos
  this.sprite = new Sprite(this)

  this.isBlocker = false

  this.install = function (level,pos) {
    this.level = level
    this.pos = pos
    this.align()
  }

  this.align = function()
  {

  }

  this.start = function(){
    this.stage = markl.stage
  }

  this.run = function () {

  }

  this.move = function (pos) {
    const mod = this.mod(pos, this.effect)
    const destination = { x: this.pos.x + mod.x, y: this.pos.y + mod.y }
    const collider = this.stage.colliderAt(destination, this.pos.z, this)

    if (collider) {
      collider.onCollision(this)
    }

    if (this.stage.inBounds(destination) === false) {
      this.pos.prev = { x: this.pos.x, y: this.pos.y }
      return
    }

    if (collider && collider.isBlocker === true) {
      this.pos.prev = { x: this.pos.x, y: this.pos.y }
      return
    }

    this.pos.prev = { x: this.pos.x, y: this.pos.y }
    this.pos.x = destination.x
    this.pos.y = destination.y
  }

  this.animateTo = function () {

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

  this.hasPos = function (pos) {
    return pos.x === this.pos.x && pos.y === this.pos.y && pos.z === this.pos.z
  }

  this.toString = function () {
    return `${this.id}`
  }
}
