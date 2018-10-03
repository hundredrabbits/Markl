'use strict'

function FighterScreen () {
  Screen.call(this, 'fighter')

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

  this.run = function () {
    for (const name in fighters) {
      const fightscript = new Fightscript(markl.scenario.script)
      const response = fightscript.find_action_in_style('menu', 'fighter', 'name is ' + name, 'select')
      if (response != 'select') { continue }
      this.select(fighters[name])
    }
  }

  this.select = function (fighter, speed = 250) {
    markl.scenario.set_fighter(fighter)

    setTimeout(() => {
      markl.flow.goto('stage')
    }, speed)
  }
}

module.exports = FighterScreen
