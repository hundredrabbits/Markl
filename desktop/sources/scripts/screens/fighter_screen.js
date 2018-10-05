'use strict'

function FighterScreen () {
  Screen.call(this, 'fighter')

  const speed = 500
  const Pest = require('../server/events/pest')
  const Lancer = require('../server/events/lancer')
  const Sin = require('../server/events/sin')
  const Patience = require('../server/events/patience')
  const Fightscript = require('../server/fightlang/fightscript')

  const fighters = {
    pest: Pest,
    lancer: Lancer,
    sin: Sin,
    patience: Patience
  }

  this.portrait_lancer = this._create_el('portrait','lancer')
  this.portrait_pest = this._create_el('portrait','pest')
  this.portrait_patience = this._create_el('portrait','patience')
  this.portrait_sin = this._create_el('portrait','sin')

  this.install = function (host) {
    this.el.appendChild(this.portrait_lancer)
    this.portrait_lancer.appendChild(this._create_el('frame'))
    this.portrait_lancer.appendChild(this._create_el('picture'))
    this.el.appendChild(this.portrait_pest)
    this.portrait_pest.appendChild(this._create_el('frame'))
    this.portrait_pest.appendChild(this._create_el('picture'))
    this.el.appendChild(this.portrait_patience)
    this.portrait_patience.appendChild(this._create_el('frame'))
    this.portrait_patience.appendChild(this._create_el('picture'))
    this.el.appendChild(this.portrait_sin)
    this.portrait_sin.appendChild(this._create_el('frame'))
    this.portrait_sin.appendChild(this._create_el('picture'))

    host.appendChild(this.el)
  }

  this.run = function () {
    const fightscript = new Fightscript(markl.scenario.script)
    for (const name in fighters) {
      const actions = fightscript.find('menu', 'fighter', 'name is ' + name)
      if(!actions[0]){ continue; }
      if(actions[0] != "SELECT"){ continue; }

      setTimeout(() => { this.select(name) },speed)
    }
  }

  this.select = function (name) {
    console.log('select',name)
    this.el.className = `screen select_${name}`
    setTimeout(() => { markl.flow.goto('stage') },speed)
  }
}

module.exports = FighterScreen
