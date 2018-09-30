'use strict';

let Pos = require('../units/pos.js')
let Action = require('../action.js')

function WAIT(host,attr = null,target = null)
{
  Action.call(this,host,attr,target);

  this.name = "wait";
  this.cost = 1;

  this.run = function(state,target)
  {
    this.host.sp -= this.cost;
    this.host.status = "idle";
  }
}

module.exports = WAIT;
