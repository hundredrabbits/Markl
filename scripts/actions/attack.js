function ATTACK(host,attr,target = null)
{
  Action.call(this,host,attr,target);

  this.name = "Attack";
  this.cost = 5;

  this.run = function()
  {
    var offset = this.host.pos.offset(this.target.pos).invert();
    var vector = new Vector(offset.x,offset.y);
    this.host.status = {action:"attack",vector:vector.name};
    this.host.stamina -= this.cost;

    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector);
    var target_at_position = markl.arena.fighter_at(target_position);

    if(target_at_position){
      console.log(this.name,"at "+target_position);
      target_at_position.target.damage(1);
      target_at_position.target.knockback(this.host.pos);
    }
    else{
      console.log(this.name,"at "+target_position+", but no one is here.");
    }
    this.host.update(); 
  }
}