'use strict';

let Pos = require('./units/pos.js')
let Vector = require('./units/vector.js')

const UP = new Vector(0,1);
const DOWN = new Vector(0,-1);
const LEFT = new Vector(-1,0);
const RIGHT = new Vector(1,0);

function Action(host,attr)
{
  this.host = host;
  this.attr = attr;
  this.cost = 1;

  this.run = function()
  {

  }

  this.end = function()
  {
    console.log(`${this.name} ENDED`)
  }

  this.make_vector = function()
  {

  }

  this.find_vector = function(attr,target)
  {
    switch(attr)
    {
      case "AWAY":   return this.find_away_vector(target);   break;
      case "TOWARD": return this.find_toward_vector(target); break;
      case "ANY":    return this.find_any_vector();    break;
      case "UP":     return new Vector(0,1);           break;
      case "DOWN":   return new Vector(0,-1);          break;
      case "LEFT":   return new Vector(-1,0);          break;
      case "RIGHT":  return new Vector(1,0);           break;
      default:       return new Vector(0,0);
    }
  }

  this.find_any_vector = function()
  {
    let vectors = [UP, RIGHT, DOWN, LEFT, DOWN, RIGHT];
    for(let id in vectors){
      let vector = vectors[(id + this.host.tp) % vectors.length];
      let target_pos = new Pos(this.host.pos.x,this.host.pos.y).add(vector);
      if(this.can_move_to(target_pos)){
        return vector;
      } 
    }
    return null;
  }

  this.find_toward_vector = function(target)
  {
    if(!target){ console.warn(this.name,"Missing target!"); return; }

    let host_pos = new Pos(this.host.pos.x,this.host.pos.y);
    let offset = host_pos.offset(target.pos).invert();
    return new Vector(offset.x,offset.y);
  }

  this.find_away_vector = function(target)
  {
    if(!target){ console.warn(this.name,"Missing target!"); return; }

    let host_pos = new Pos(this.host.pos.x,this.host.pos.y);
    let offset = host_pos.offset(target.pos).invert();
    let vector = new Vector(offset.x,offset.y);

    // backward
    let target_position
    target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector.invert());

    if(this.can_move_to(target_position)){
      return vector.invert();
    }

    // Sideways
    target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector.rotate(1));

    if(this.can_move_to(target_position)){
      return vector.rotate(1);
    }
    // Sideways
    target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector.rotate(-1));

    if(this.can_move_to(target_position)){
      return vector.rotate(-1);
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

module.exports = Action;