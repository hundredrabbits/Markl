'use strict';

const Pest = require('../server/core/fighters/pest');
const Lancer = require('../server/core/fighters/lancer');
const Sin = require('../server/core/fighters/sin');
const Patience = require('../server/core/fighters/patience');

function FighterScreen()
{
  Screen.call(this,"fighter");

  const fighters = {
    pest: Pest,
    lancer: Lancer,
    sin: Sin,
    patience: Patience
  };

  this.run = function()
  {
    for(const name in fighters){
      const fightscript = new Fightscript(markl.scenario.script);
      const response = fightscript.query("menu","fighter","name is "+name,"select")
      if(response != "select"){ continue; }
      this.select(fighters[name]);
    }
  }

  this.select = function(fighter,speed = 250)
  {
    markl.scenario.set_fighter(fighter);
    
    setTimeout(() => {
      markl.flow.goto("stage");
    },speed)
  }
}

module.exports = FighterScreen