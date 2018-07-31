var Pos = require('../units/pos.js')
var Action = require('../action.js')

function IDLE(host,attr = null)
{
  Action.call(this,host,attr);

  this.name = "idle";
  this.cost = 20;

  this.run = function(state,target)
  {
    this.host.sp -= this.cost;
    this.host.status = "confused";
  }
}

module.exports = IDLE;
