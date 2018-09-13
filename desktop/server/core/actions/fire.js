"use strict";

let Pos = require('../units/pos.js')
const Vector = require('../units/vector.js')
let Action = require('../action.js')
let Missle = require('../missle.js')

function FIRE(host,attr)
{
  Action.call(this,host,attr);

  this.name = "fire";
  this.cost = 20;

  this.run = function(state,target)
  {
    this.state = state;
    this.host.sp -= this.cost;

    if(this.host.status == "stasis"){
      this.host.status = "recovery";
      return;
    }

    let host_pos = new Pos(this.host.pos.x,this.host.pos.y);
    let offset = host_pos.offset(this.target.pos).invert();
    let vector = new Vector(offset.x,offset.y);
    this.host.status = this.name;
    this.host.sp -= this.cost;

    // Add new missle into play

    let missle = new Missle(this.host,{pos:host_pos.add(vector),vector:vector,life:5});
    state.events.push(missle);
  }
}

module.exports = FIRE;
