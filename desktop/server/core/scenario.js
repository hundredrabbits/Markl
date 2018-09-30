'use strict';

function Scenario()
{
  this.fightscript = null;
  this.character = null;
  this.stage = null;

  this.set_fightscript = function(fightscript)
  {
    console.log("set_fightscript")
    this.fightscript = fightscript;
  }

  this.set_character = function(character)
  {
    console.log("set_character")
    this.character = character;
  }

  this.set_stage = function(stage)
  {
    console.log("set_stage")
    this.stage = stage;
  }


  this.run = function()
  {
    if(!this.fightscript){ console.warn("Missing fightscript"); return; }
    if(!this.character){ console.warn("Missing character"); return; }
    if(!this.stage){ console.warn("Missing stage"); return; }

    console.log("GO!")
  }

  // this.name = null;
  // this.state = null;
  // this.history = null;

  // this.load = function(name)
  // {
  //   this.name = name;
  //   console.log(`Loading ${this.name}`)
  //   this.reload();
  // }

  // this.reload = function()
  // {
  //   this.state = this.copy(require(`../scenarios/${this.name}`));
  //   this.state.turn = 0;
  // }

  // this.inject_style = function(style,player = 0)
  // {
  //   this.state.players[0].style = style;
  //   console.log(`Updated player#${player} style!`)
  // }

  // this.run = function()
  // {
  //   console.log(`Running ${this.name}(${this.state.players.length})`)
  //   this.history = supervisor.render(this.state);
  //   console.log(`Completed ${this.name}, in ${this.history.length} turns`)
  //   return this.history;
  // }

  // this.copy = function(state)
  // {
  //   return JSON.parse(JSON.stringify(state))
  // }
}

module.exports = Scenario