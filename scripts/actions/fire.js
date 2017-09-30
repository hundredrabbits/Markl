function FIRE(vector)
{
  Action.call(this);
  this.name = "Fire";
  this.vector = vector;

  this.target_position = null;
  this.target_tile = null;

  this.run = function()
  {
    this.target_position = new Pos(this.host.pos.x,this.host.pos.y).add(this.vector);
    this.target_tile = markl.arena.collider_at(this.target_position);

    if(this.target_tile && this.target_tile.is_collider){
      console.log(this.name,"at "+this.target_position);
      var position = this.target_position;
      var tile = this.target_tile;
      var host = this.host;
      setTimeout(function(){ attack(position,tile,host); }, ACT_SPEED);
    }
    else{
      console.log(this.name,"at "+this.target_position+", but no one is here.");
      setTimeout(function(){ markl.battle.turn(); }, ACT_SPEED/4);
    }
  }

  function attack(position,target,host)
  {
    target.style.react(null,host);
    
    // If position is the same, land dammage
    if(target.pos.is_equal(position)){
      console.log("Target receive damage")
      target.hp -= 1;
      target.update();
    }
    else{
      console.log("Target moved") 
    }
  }
}