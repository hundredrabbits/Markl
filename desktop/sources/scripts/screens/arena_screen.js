'use strict'

function ArenaScreen () {
  Screen.call(this, 'arena')

  this.arena = this._create_el('arena')
  this.background = document.createElement('background')
  this.animator = new Animator(this.el)

  let STAGE = { padding: { x: 15, y: 15 }, tile: 80 }

  this.sprites = { fighters: {}, events: {}, effects: [] }

  this.install = function (host) {
    this.arena.appendChild(this.background)
    this.el.appendChild(this.arena)
    host.appendChild(this.el)

    this.arena.style.transition = `all ${TIMING.camera}ms`
    this.arena.style.width = `${5 * STAGE.tile}px`
    this.arena.style.height = `${5 * STAGE.tile}px`
    this.arena.style.left = `calc(50% - ${(5 * STAGE.tile) / 2}px)`
    this.arena.style.top = `calc(55% - ${(5 * STAGE.tile) / 2}px)`
  }

  this.run = function () {
    const history = markl.scenario.render()
    markl.interface.navigator.load(history)

    const state = history[0]
    add_class(this.arena, state.theme)
    this.create_sprites(state)
  }

  this.play = function (state) {
    if (!state) { return }

    this.remove_effects()

    markl.interface.navigator.update()
    this.update_sprites(state)
    this.add_effects(state)
    this.focus(state)
  }

  this.create_sprites = function (state) {
    for (let id in state.fighters) {
      let fighter = state.fighters[id]
      if (this.sprites.fighters[fighter.id]) { continue }
      let sprite = new Sprite('fighter', fighter.name)
      sprite.setup(fighter)
      this.sprites.fighters[fighter.id] = sprite
      this.arena.appendChild(sprite.el)
    }
  }

  this.update = function () {
  }

  this.update_sprites = function (state) {
    for (const id in this.sprites.fighters) {
      const sprite = this.sprites.fighters[id]
      sprite.update(state.fighters[id])
    }
  }

  this.remove_effects = function () {
    for (let id in this.sprites.effects) {
      let effect = this.sprites.effects[id]
      effect.el.parentNode.removeChild(effect.el)
    }
    this.sprites.effects = []
  }

  this.add_effects = function (state) {
    for (let id in state.effects) {
      let effect = state.effects[id]
      this.add_effect('hit', effect.pos)
    }
  }

  this.add_effect = function (name, pos) {
    let effect = new Effect(name, pos)
    this.sprites.effects.push(effect)
    this.arena.appendChild(effect.el)
  }

  this.center = function (state) {
    let positions = []

    for (let id in state.fighters) {
      let fighter = state.fighters[id]
      if (fighter.hp < 1) { continue }
      positions.push(fighter.pos)
    }

    let sum = { x: 0, y: 0 }
    for (let id in positions) {
      sum.x += positions[id].x
      sum.y += positions[id].y
    }
    let average = { x: sum.x / positions.length, y: sum.y / positions.length }
    let stage_center = (STAGE.tile * 4) / 2

    let x = (average.x * STAGE.tile) - (2 * STAGE.tile)
    let y = (average.y * STAGE.tile) - (2 * STAGE.tile)

    return { x: x, y: y }
  }

  this.focus = function (state) {
    let center = this.center(state)

    this.arena.style.transform = `translate(${-parseInt(center.x)}px, ${-parseInt(center.y)}px)`
  }

  // KEEP
}

module.exports = ArenaScreen
