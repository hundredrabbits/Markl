'use strict'

function ArenaScreen () {
  Screen.call(this, 'arena')

  this.arena = this._create_el('arena')
  this.background = document.createElement('background')
  this.animator = new Animator(this.el)

  let STAGE = { padding: { x: 15, y: 15 }, tile: 80 }

  this.sprites = { players: {}, events: {}, effects: [] }

  this.install = function (host) {
    this.arena.appendChild(this.background)
    this.el.appendChild(this.arena)

    host.appendChild(this.el)

    this.arena.style.transition = `all ${TIMING.camera}ms`
    // Resize
    this.arena.style.width = `${5 * STAGE.tile}px`
    this.arena.style.height = `${5 * STAGE.tile}px`
    // Center
    this.arena.style.left = `calc(50% - ${(5 * STAGE.tile) / 2}px)`
    this.arena.style.top = `calc(55% - ${(5 * STAGE.tile) / 2}px)`
  }

  this.run = function () {
    const history = markl.scenario.render()
    add_class(this.arena,history[0].theme)
    console.log(markl.scenario,history)
  }


  this.update = function (state, reaction) {
    if (!state) { return }

    this.remove_effects()
    this.verify_sprites(state)
    this.update_sprites(state)
    this.add_effects(state)
    this.focus(state)

    this.animator.start()

    markl.interface.update(state, reaction)
    markl.navigator.update(state)
  }

  this.verify_sprites = function (state) {
    for (let id in state.players) {
      let player = state.players[id]
      if (this.sprites.players[player.id]) { continue }
      console.log('Creating sprite for ', player.id)
      let sprite = new Sprite('player', player.id)
      sprite.setup(player)
      this.sprites.players[player.id] = sprite
      this.arena.appendChild(sprite.el)
    }
  }

  this.update_sprites = function (state) {
    for (let id in this.sprites.players) {
      let player = this.sprites.players[id]
      player.animate_to(state.players[id].pos)
      player.set_status(state.players[id].status)
      player.set_fighter(state.players[id].fighter)
      player.set_vector(state.players[id].vector)
      player.update()
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

    for (let id in state.players) {
      let player = state.players[id]
      if (player.hp < 1) { continue }
      positions.push(player.pos)
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
