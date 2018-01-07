const Pos = require('../../units/pos.js')
const Vector = require('../../units/vector.js')
const Action = require('./action.js')

const UP = new Vector(0,1);
const DOWN = new Vector(0,-1);
const LEFT = new Vector(-1,0);
const RIGHT = new Vector(1,0);

function MOVE(host,attr,target = null)
{
  Action.call(this,host,attr,target);
  
  this.name = "move";
  this.cost = 2;
  this.state = null;

  this.run = function(state)
  {
    this.state = state;
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

    // this.host.status = {action:this.name,vector:vector.name};
    this.host.sp -= this.cost;

    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector);
    var collider = this.player_at(target_position);

    console.log(`MOVE ${host_pos.toString()} -> ${target_position.toString()}`)

    if(collider){
      console.log(this.name,"collided with "+collider.name+" "+target_position);
    }
    else{
      this.host.pos = {x:target_position.x,y:target_position.y};
    }

    this.end();
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

    return 
  }

  this.find_any_vector = function()
  {
    var vectors = [RIGHT, LEFT, UP, DOWN];
    var vector = items[Math.floor(Math.random()*items.length)];

    for(id in vectors){
      var vector = vectors[id];
      var target_pos = new Pos(this.host.pos.x,this.host.pos.y).add(vector);
      if(this.can_move_to(target_pos)){
        return vector;
      } 
    }
    console.log("BLOCKED?!")
    return null;
  }

  this.can_move_to = function(pos)
  {
    if(pos.x > 5){ return false; }
    if(pos.y > 5){ return false; }
    if(pos.x < 0){ return false; }
    if(pos.y < 0){ return false; }
    return !this.player_at(pos) ? true : false;
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

module.exports = MOVE;
