function ATTACK(host,attr,target = null)
{
  Action.call(this,host,attr,target);

  this.name = "Attack";
  this.cost = 5;

  this.run = function()
  {
    var offset = this.host.pos.offset(this.target.pos).invert();
    var vector = new Vector(offset.x,offset.y);
    this.host.status = {action:this.name,vector:vector.name};
    this.host.stamina -= this.cost;

    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector);
    var event_at_position = markl.arena.event_at(target_position,"fighter");

    if(event_at_position){
      console.log(this.name,"at "+target_position+"("+vector.name+")");
      event_at_position.damage(1);
      event_at_position.knockback(vector);
    }
    else{
      console.log(this.name,"at "+target_position+", but no one is here.");
    }
    this.host.update(); 
  }
}