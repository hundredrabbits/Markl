var Pos = require('../../units/pos.js')
const Vector = require('../../units/vector.js')
var Action = require('./action.js')

function FIRE(host,attr,target = null)
{
  Action.call(this,host,attr,target);

  this.name = "fire";
  this.cost = 20;

  this.run = function(state)
  {
    this.state = state;

    var host_pos = new Pos(this.host.pos.x,this.host.pos.y);
    var offset = host_pos.offset(this.target.pos).invert();
    var vector = new Vector(offset.x,offset.y);
    this.host.status = this.name;
    this.host.sp -= this.cost;

    console.log(`FIRE ${host_pos} => ${vector}`)


  }
}

module.exports = FIRE;
