"use strict";

const Pos = require('../units/pos.js')
const Vector = require('../units/vector.js')
const Action = require('../action.js')

function DASH(host,attr)
{
  Action.call(this,host,attr);
  
  this.name = "dash";
  this.cost = 7;

  this.run = function(state,target)
  {
    this.state = state;
    this.host.sp -= this.cost;

    if(this.host.status == "stasis"){
      this.host.status = "recovery";
      return;
    }
    
    let vector = this.find_vector(this.attr,target);
    let target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector);

    while(this.can_move_to(target_position)){
      this.host.pos = {x:target_position.x,y:target_position.y};
      this.host.status = "dash";
      this.host.vector = vector.name;
      // Update
      target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector);
    }
  }
}

module.exports = DASH;
