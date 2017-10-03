function MOVE(host,attr,target = null)
{
  Action.call(this,host,attr,target);
  
  this.name = "Move";
  this.cost = 2;

  this.run = function()
  {
    var offset = this.host.pos.offset(this.target.pos).invert();
    var vector = new Vector(offset.x,offset.y);
    this.host.status = {action:this.name,vector:vector.name};
    this.host.stamina -= this.cost;

    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector);
    var event_at_position = markl.arena.event_at(target_position);

    this.host.update();

    if(target_position.x >= markl.arena.size.width || target_position.x < 0 || target_position.y >= markl.arena.size.height || target_position.y < 0){
      console.log(this.name,"collided with wall");
    }
    else if(event_at_position){
      console.log(this.name,"collided with "+event_at_position.name+" "+target_position);
      // event_at_position.bump();
    }
    else{
      this.host.pos = new Pos(target_position.x,target_position.y);
      $(this.host.el).animate({ top:target_position.html().y, left:target_position.html().x }, ACT_SPEED);
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