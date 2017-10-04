function MOVE(host,attr,target = null)
{
  Action.call(this,host,attr,target);
  
  this.name = "Move";
  this.cost = 2;

  this.run = function()
  {
    var vector = null;

    if(this.attr == "AWAY"){
      var offset = this.host.pos.offset(this.target.pos).invert();
      vector = this.find_away_vector(new Vector(offset.x,offset.y));
    }
    if(this.attr == "TOWARD"){
      var offset = this.host.pos.offset(this.target.pos).invert();
      vector = new Vector(offset.x,offset.y);
    }
    if(this.attr == "ANY"){
      vector = this.find_any_vector();
    }

    console.log(this.attr,vector)

    this.host.status = {action:this.name,vector:vector.name};
    this.host.stamina -= this.cost;

    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector);
    var colliders_at_position = markl.arena.colliders_at(target_position);

    this.host.update();

    if(target_position.x >= markl.arena.size.width || target_position.x < 0 || target_position.y >= markl.arena.size.height || target_position.y < 0){
      console.log(this.name,"collided with wall");
    }
    else if(colliders_at_position.length > 0){
      console.log(this.name,"collided with "+colliders_at_position[0].name+" "+target_position);
      // event_at_position.bump();
    }
    else{
      this.host.pos = new Pos(target_position.x,target_position.y);
      $(this.host.el).animate({ top:target_position.html().y, left:target_position.html().x }, ACT_SPEED);
    }
  }

  this.find_away_vector = function(vector)
  {
    // backward
    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector.invert());

    if(this.host.can_move_to(target_position)){
      return vector.invert();
    }

    // Sideways
    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector.rotate(1));

    if(this.host.can_move_to(target_position)){
      return vector.rotate(1);
    }
    // Sideways
    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector.rotate(-1));

    if(this.host.can_move_to(target_position)){
      return vector.rotate(-1);
    }

    return 
  }

  this.find_any_vector = function()
  {
    var items = [RIGHT, LEFT, UP, DOWN];
    var vector = items[Math.floor(Math.random()*items.length)];

    var target_pos = new Pos(this.host.pos.x,this.host.pos.y).add(vector);
    if(!this.host.can_move_to(target_pos)){
      vector = this.find_any_vector();
    }

    return vector;
  }
}