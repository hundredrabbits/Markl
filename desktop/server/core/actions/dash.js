const Pos = require('../units/pos.js')
const Vector = require('../units/vector.js')
const Action = require('../action.js')

function DASH(host,attr,target = null)
{
  Action.call(this,host,attr,target);
  
  this.name = "dash";
  this.cost = 5;

  this.run = function(state)
  {
    this.state = state;
    this.host.sp -= this.cost;

    if(this.host.status == "stasis"){
      this.host.status = "recovery";
      return;
    }
    
    var vector = this.find_vector(this.attr);
    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector);

    while(this.can_move_to(target_position)){
      this.host.pos = {x:target_position.x,y:target_position.y};
      this.host.status = "dash";
      this.host.vector = vector.name;
    }
  }

  this.can_move_to = function(pos)
  {
    if(pos.x > 4){ return false; }
    if(pos.y > 4){ return false; }
    if(pos.x < 0){ return false; }
    if(pos.y < 0){ return false; }
    return !this.player_at(pos) ? true : false;
  }

  this.player_at = function(pos)
  {
    for(id in this.state.players){
      var player = this.state.players[id];
      var player_pos = new Pos(player.pos.x,player.pos.y);
      if(player.hp > 0 && player_pos.is_equal(pos)){
        return player;
      }
    }
    return null;
  }
}

module.exports = DASH;
