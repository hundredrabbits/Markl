const Pos = require('../units/pos.js')
const Vector = require('../units/vector.js')
const Action = require('../action.js')

function MOVE(host,attr)
{
  Action.call(this,host,attr);
  
  this.name = "move";
  this.cost = 5;

  this.run = function(state,target)
  {
    this.state = state;
    this.host.sp -= this.cost;

    if(this.host.status == "stasis"){
      this.host.status = "recovery";
      return;
    }
    
    var vector = this.find_vector(this.attr,target);
    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector);

    if(this.can_move_to(target_position)){
      this.host.pos = {x:target_position.x,y:target_position.y};
      this.host.status = "move";
      this.host.vector = vector.name;
    }
  }
}

module.exports = MOVE;
