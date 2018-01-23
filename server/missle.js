var Pos = require('./units/pos.js')
var Vector = require('./units/vector.js')

function Missle(host,settings)
{
  this.name = "missle";
  this.pos = settings.pos;
  this.vector = settings.vector;
  this.life = settings.life;
  this.damage = 1;
  this.host = host;

  this.to_s = function()
  {
    return `${this.name}(${this.pos} ${this.vector})`
  }

  this.run = function(state)
  {
    this.life -= 1;

    this.step(state);

    this.pos.x += this.vector.x;
    this.pos.y += this.vector.y;

    this.step(state);

    if(!this.can_move_to(state,this.pos)){
      this.life = -1;
    }
  }

  this.step = function(state)
  {
    if(this.life < 0){ return; }

    var collider = this.player_at(state,this.pos);

    if(!collider){ return; }

    state.effects.push({name:"hit",pos:this.pos})
    collider.hp -= this.damage;
    collider.status = collider.hp < 1 ? "dead" : "stasis";
    this.host.score.hits += 1;
    this.knockback(state,collider,this.vector);
    this.life = -1;
  }

  this.knockback = function(state,host,vector)
  {
    var host_pos = new Pos(host.pos.x,host.pos.y);
    var target_position = new Pos(host.pos.x,host.pos.y).add(vector);
    if(this.can_move_to(state,target_position)){
      host.pos = {x:target_position.x,y:target_position.y};  
    }
  }

  this.can_move_to = function(state,pos)
  {
    if(pos.x > 4){ return false; }
    if(pos.y > 4){ return false; }
    if(pos.x < 0){ return false; }
    if(pos.y < 0){ return false; }
    return !this.player_at(pos) ? true : false;
  }

  this.player_at = function(state,pos)
  {
    for(id in state.players){
      var player = state.players[id];
      var player_pos = new Pos(player.pos.x,player.pos.y);
      if(player.hp > 0 && player_pos.is_equal(pos)){
        return player;
      }
    }
    return null;
  }
}

module.exports = Missle;