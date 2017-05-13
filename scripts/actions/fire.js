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
      console.warn(this.name,"at "+this.target_tile.name);
      this.target_tile.style.react(null,this.host);
    }
    else{
      console.warn(this.name,"Nothing.");
    }
  }
}