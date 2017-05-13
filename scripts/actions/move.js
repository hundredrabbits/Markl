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

    if(this.destination_tile && this.destination_tile.is_collider){
      console.warn(this.name,"Collided with "+this.destination_tile.name);
      this.host.style.react(this.destination_tile);
    }
    else{
      console.warn(this.name,"to "+this.target_position);
      this.host.pos.update(this.target_position);
      // $(this.host.element).animate({ top:this.target_position.html().y, left:this.target_position.html().x }, ACT_SPEED);
      $(this.host.element).css("top",this.target_position.html().y);
      $(this.host.element).css("left",this.target_position.html().x);
    }
  }
}