var Pos = require('../../units/pos.js')
var Action = require('../action.js')

function IDLE(host,attr = null,target = null)
{
  Action.call(this,host,attr,target);

  this.name = "idle";
  this.cost = 20;

  this.run = function()
  {
    this.host.sp -= this.cost;
    this.host.status = "confused";
  }
}

module.exports = IDLE;
