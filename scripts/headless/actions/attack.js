var Pos = require('../../units/pos.js')
const Vector = require('../../units/vector.js')
var Action = require('./action.js')

function ATTACK(host,attr,target = null)
{
  Action.call(this,host,attr,target);

  this.name = "attack";
  this.cost = 10;

  this.run = function(state)
  {
    this.state = state;

    var host_pos = new Pos(this.host.pos.x,this.host.pos.y);
    var offset = host_pos.offset(this.target.pos).invert();
    var vector = new Vector(offset.x,offset.y);
    this.host.status = {action:this.name,vector:vector.name};
    this.host.stamina -= this.cost;

    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector);
    var collider = this.player_at(target_position);

    console.log(`ATCK ${host_pos.toString()} => ${target_position.toString()}`)

    if(collider){
      console.log(this.name,"at "+target_position+"("+vector.name+")");
      collider.hp -= 1;
      collider.status = "hit"
    }
    else{
      console.log(this.name,"at "+target_position+", but no one is here.");
    }
  }

  this.player_at = function(pos)
  {
    for(id in this.state.players){
      var player = this.state.players[id];
      var player_pos = new Pos(player.pos.x,player.pos.y);
      if(player_pos.is_equal(pos)){
        return player;
      }
    }
    return null;
  }
}

module.exports = ATTACK;
