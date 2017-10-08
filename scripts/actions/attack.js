function ATTACK(host,attr,target = null)
{
  Action.call(this,host,attr,target);

  this.name = "attack";
  this.cost = 10;

  this.run = function()
  {
    var offset = this.host.pos.offset(this.target.pos).invert();
    var vector = new Vector(offset.x,offset.y);
    this.host.status = {action:this.name,vector:vector.name};
    this.host.stamina -= this.cost;

    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector);
    var event_at_position = markl.arena.event_at(target_position,"fighter");

    if(vector.name == "right"){
      this.host.el.style.left = this.host.pos.html().x + 10;
    }
    if(vector.name == "left"){
      this.host.el.style.left = this.host.pos.html().x - 10;
    }
    if(vector.name == "up"){
      this.host.el.style.top = this.host.pos.html().y - 10;
    }
    if(vector.name == "down"){
      this.host.el.style.top = this.host.pos.html().y + 10;
    }
    $(this.host.el).animate({ top:this.host.pos.html().y, left:this.host.pos.html().x }, ACT_SPEED/2);

    if(event_at_position){
      console.log(this.name,"at "+target_position+"("+vector.name+")");
      event_at_position.damage(1);
      event_at_position.knockback(vector);
    }
    else{
      console.log(this.name,"at "+target_position+", but no one is here.");
    }
    this.host.animator.index = 0;
    this.host.update(); 
  }
}