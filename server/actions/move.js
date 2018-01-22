const Pos = require('../units/pos.js')
const Vector = require('../units/vector.js')
const Action = require('../action.js')

const UP = new Vector(0,1);
const DOWN = new Vector(0,-1);
const LEFT = new Vector(-1,0);
const RIGHT = new Vector(1,0);

function MOVE(host,attr,target = null)
{
  Action.call(this,host,attr,target);
  
  this.name = "move";
  this.cost = 5;
  this.state = null;

  this.run = function(state)
  {
    this.state = state;
    this.host.sp -= this.cost;

    if(this.host.status == "stasis"){
      this.host.status = "recovery";
      return;
    }
    
    var host_pos = new Pos(this.host.pos.x,this.host.pos.y);
    var vector = null;

    if(this.attr == "AWAY"){
      var offset = host_pos.offset(this.target.pos).invert();
      vector = this.find_away_vector(new Vector(offset.x,offset.y));
    }
    if(this.attr == "TOWARD"){
      var offset = host_pos.offset(this.target.pos).invert();
      vector = new Vector(offset.x,offset.y);
    }
    if(this.attr == "ANY"){
      vector = this.find_any_vector();
    }
    if(this.attr == "UP"){
      vector = new Vector(0,1)
    }
    if(this.attr == "DOWN"){
      vector = new Vector(0,-1)
    }
    if(this.attr == "LEFT"){
      vector = new Vector(-1,0)
    }
    if(this.attr == "RIGHT"){
      vector = new Vector(1,0)
    }

    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector);

    if(!this.can_move_to(target_position)){
      // console.log(this.name,"cannot move there");
    }
    else{
      this.host.pos = {x:target_position.x,y:target_position.y};
      this.host.status = "moving";
      this.host.vector = vector.name;
    }
  }

  this.find_away_vector = function(vector)
  {
    // backward
    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector.invert());

    if(this.can_move_to(target_position)){
      return vector.invert();
    }

    // Sideways
    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector.rotate(1));

    if(this.can_move_to(target_position)){
      return vector.rotate(1);
    }
    // Sideways
    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector.rotate(-1));

    if(this.can_move_to(target_position)){
      return vector.rotate(-1);
    }

    return null;
  }

  this.find_any_vector = function()
  {
    var vectors = [UP, RIGHT, DOWN, LEFT];
    for(id in vectors){
      var vector = vectors[(id + this.state.turn) % vectors.length];
      var target_pos = new Pos(this.host.pos.x,this.host.pos.y).add(vector);
      if(this.can_move_to(target_pos)){
        return vector;
      } 
    }
    return null;
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

module.exports = MOVE;
