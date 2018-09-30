'use strict';

const Pest = require('../server/core/characters/pest');
const Lancer = require('../server/core/characters/lancer');
const Sin = require('../server/core/characters/sin');
const Patience = require('../server/core/characters/patience');

function CharacterScreen()
{
  Screen.call(this,"character");

  const characters = {
    pest: Pest,
    lancer: Lancer,
    sin: Sin,
    patience: Patience
  };

  this.run = function()
  {
    for(const name in characters){
      const fightscript = new Fightscript(markl.scenario.script);
      const response = fightscript.query("menu","character","name is "+name,"select")
      if(response != "select"){ continue; }
      this.select(characters[name]);
    }
  }

  this.select = function(character,speed = 250)
  {
    markl.scenario.set_character(character);

    setTimeout(() => {
      markl.flow.goto("stage");
    },speed)
  }
}

module.exports = CharacterScreen