'use strict';

let Wait = require('../actions/wait')

function Fighter(id,pos,fightscript)
{
  this.id = id
  this.pos = pos
  this.fightscript = fightscript;
  this.fightscript.host = this;

  // Fighter Overrides
  this.name = "unknown"
  this.type = "FIGHTER"

  this.hp = 0; // Health Point
  this.sp = 0; // Stamina Point
  this.tp = 0; // Turn Point

  this.status = "idle"

  this.score = { hits:0, blocks:0 }

  this.enact = function(reaction)
  { 
    if(!reaction){ return new Wait(this).run(); }

    const action = new reaction.action(this);
    action.run(reaction.params);
  }

  this.is_visible = function()
  {
    return true;
  }

  this.toString = function()
  {
    return `${this.name}:${this.type} at ${this.pos.x},${this.pos.y}`
  }
}

module.exports = Fighter;