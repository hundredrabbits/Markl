function FIRE(host,attr,target = null)
{
  Action.call(this,host,attr,target);

  this.name = "wait";
  this.cost = 1;

  this.name = "Wait";

  this.run = function()
  {
    var offset = this.host.pos.offset(this.target.pos).invert();
    var vector = new Vector(offset.x,offset.y);
    this.host.status = {action:this.name,vector:vector.name};
    this.host.stamina -= this.cost;

    var target_position = new Pos(this.host.pos.x,this.host.pos.y).add(vector);

    // markl.arena.add_event(new Missle(target_position));
    this.host.update();
  }
}