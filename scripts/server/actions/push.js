var Pos = require('../units/pos.js')
const Vector = require('../units/vector.js')
var Action = require('../action.js')

function PUSH(host,attr,target = null)
{
  Action.call(this,host,attr,target);

  this.name = "push";
  this.cost = 8;

  this.run = function(state)
  {
    this.state = state;
    this.host.sp -= this.cost;

    if(this.host.status == "stasis"){
      this.host.status = "recovery";
      return;
    }

    var host_pos = new Pos(this.host.pos.x,this.host.pos.y);
    var offset = host_pos.offset(this.target.pos).invert();
    var vector = new Vector(offset.x,offset.y);
    this.host.status = this.name;

    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector);
    var collider = this.player_at(target_position);

    console.log(`PUSH ${host_pos.toString()} => ${target_position.toString()}`)

    if(!collider){ return; }
    var slide = 0;
    while(slide < 5){
      this.knockback(collider,vector);
      slide += 1;
    }
    collider.status = "stasis";
  }

  this.knockback = function(host,vector)
  {
    var host_pos = new Pos(host.pos.x,host.pos.y);
    var target_position = new Pos(host.pos.x,host.pos.y).add(vector);
    if(this.can_move_to(target_position)){
      host.pos = {x:target_position.x,y:target_position.y};  
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

module.exports = PUSH;
