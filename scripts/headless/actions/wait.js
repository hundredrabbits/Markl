var Pos = require('../../units/pos.js')
var Action = require('./action.js')

function WAIT(host,attr = null,target = null)
{
  Action.call(this,host,attr,target);

  this.name = "wait";
  this.cost = 1;

  this.run = function()
  {
    this.host.sp -= this.cost;
  }
}

module.exports = WAIT;
