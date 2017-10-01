function ATTACK(vector)
{
  Action.call(this);

  this.name = "Attack";
  this.vector = vector;

  this.target_position = null;
  this.target = null;

  this.run = function()
  {
    this.host.stamina -= 5;
    this.target_position = new Pos(this.host.pos.x,this.host.pos.y).add(this.vector);
    this.target = markl.arena.fighter_at(this.target_position);

    if(this.target){
      console.log(this.name,"at "+this.target_position);
      this.target.damage(1);
      this.target.knockback(this.host.pos);
    }
    else{
      console.log(this.name,"at "+this.target_position+", but no one is here.");
    }
  }
}