function MOVE(host,attr,target = null)
{
  Action.call(this,host,attr,target);
  
  this.name = "Move";
  this.cost = 2;

  this.run = function()
  {
    if(!this.vector){ this.vector = this.find_any(); }

    this.host.status = {action:"move",vector:this.vector.name};
    this.host.stamina -= this.cost;
    
    this.target_position = new Pos(this.host.pos.x,this.host.pos.y).add(this.vector);
    this.destination_tile = markl.arena.collider_at(this.target_position);

    this.host.update();

    if(this.target_position.x >= markl.arena.size.width || this.target_position.x < 0 || this.target_position.y >= markl.arena.size.height || this.target_position.y < 0){
      console.log(this.name,"collided with wall")
    }
    else if(this.destination_tile && this.destination_tile.is_collider){
      console.log(this.name,"collided with "+this.destination_tile.name+" "+this.target_position);
    }
    else{
      console.log(this.name,"to "+this.target_position);
      this.host.pos.update(this.target_position);
      $(this.host.el).animate({ top:this.target_position.html().y, left:this.target_position.html().x }, ACT_SPEED);
    }
  }

  this.find_any = function()
  {
    var items = [RIGHT, LEFT, UP, DOWN];
    var vector = items[Math.floor(Math.random()*items.length)];

    var target_pos = new Pos(this.host.pos.x,this.host.pos.y).add(vector);
    if(!this.host.can_move_to(target_pos)){
      vector = this.find_any();
    }

    return vector;
  }
}