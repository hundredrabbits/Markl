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

    if(this.is_colliding_with_limits()){
      console.warn(this.name,"Hit limits");
      // var action = this.host.style.on_collision(new Wall(this.target_position));
      // this.host.style.render(action);
    }
    else if(this.destination_tile && this.destination_tile.is_collider){
      console.warn(this.name,"Hit event");
      this.host.collider = this.destination_tile;
    }
    else{
      console.warn(this.name,"Move");
      this.host.pos.update(this.target_position);
      $(this.host.element).animate({ top:this.target_position.html().y, left:this.target_position.html().x }, ACT_SPEED);
    }
  }

  this.is_colliding_with_limits = function()
  {
    return this.target_position.x < 0 || this.target_position.x >= markl.arena.size.width || this.target_position.y < 0 || this.target_position.y >= markl.arena.size.height;
  }
}