function MOVE(vector)
{
  Action.call(this);
  
  this.name = "Move";
  this.vector = vector;
  this.target_position = null;
  this.destination_tile = null;

  this.run = function()
  {
    this.target_position = new Pos(this.host.pos.x,this.host.pos.y).add(this.vector);
    this.destination_tile = markl.arena.collider_at(this.target_position);

    if(this.target_position.x >= markl.arena.size.width || this.target_position.x < 0 || this.target_position.y >= markl.arena.size.height || this.target_position.y < 0){
      console.log(this.name,"collided with wall")
    }
    else if(this.destination_tile && this.destination_tile.is_collider){
      console.log(this.name,"collided with "+this.destination_tile.name+" "+this.target_position);
      this.host.style.react(this.destination_tile);
    }
    else{
      console.log(this.name,"to "+this.target_position);
      this.host.pos.update(this.target_position);
      $(this.host.el).animate({ top:this.target_position.html().y, left:this.target_position.html().x }, ACT_SPEED);
    }
  }
}