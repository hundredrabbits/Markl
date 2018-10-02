'use strict';

const Pos = require('../units/pos.js')
const Vector = require('../units/vector.js')
const Action = require('./action.js')

function ATTACK(host,attr)
{
  Action.call(this,host,attr);

  this.name = "attack";
  this.cost = 10;

  this.run = function(state,target)
  {
    this.state = state;
    this.host.sp -= this.cost;

    if(this.host.status == "stasis"){
      this.host.status = "recovery";
      return;
    }

    let vector = this.find_vector(this.attr,target);
    let target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector);
    let collider = this.player_at(target_position);

    if(collider){
      state.effects.push({name:"hit",pos:target_position})
      collider.hp -= 1;
      collider.status = collider.hp < 1 ? "kill" : "hit";
      this.host.status = this.name;
      this.host.vector = vector.name;
      this.host.score.hits += 1;
      this.knockback(collider,vector);
    }
    else{
      console.log("Attack missed!")
      this.host.status = "idle";
    }
  }

  this.knockback = function(host,vector)
  {
    let host_pos = new Pos(host.pos.x,host.pos.y);
    let target_position = new Pos(host.pos.x,host.pos.y).add(vector);
    host.origin = host_pos;
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
    for(let id in this.state.players){
      let player = this.state.players[id];
      let player_pos = new Pos(player.pos.x,player.pos.y);
      if(player.hp > 0 && player_pos.is_equal(pos)){
        return player;
      }
    }
    return null;
  }
}

module.exports = ATTACK;
