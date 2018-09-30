'use strict';

let Supervisor = require('./supervisor')

function Scenario()
{
  this.script = null;
  this.character = null;
  this.stage = null;

  this.set_script = function(script)
  {
    console.log("set_script")
    this.script = script;
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

  this.render = function()
  {
    if(!this.script){ console.warn("Missing fightscript"); return; }
    if(!this.character){ console.warn("Missing character"); return; }
    if(!this.stage){ console.warn("Missing stage"); return; }

    console.log("Rendering history")

    return Supervisor(this.script,this.character,this.stage);
  }
}

module.exports = Scenario