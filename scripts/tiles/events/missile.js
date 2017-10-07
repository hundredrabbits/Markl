function Missile(pos,vector)
{
  Event.call(this,pos);

  this.name = "Missle";
  this.vector = vector;
  this.is_collider = false;
  this.is_visible = true;
  this.is_active = true;
  this.type = "missile";
  this.el.className = "missile";

  this.sprite = document.createElement("sprite");

  this.start = function()
  {
    this.el.appendChild(this.sprite);
  }

  this.move = function()
  {
    if(!this.is_active){ return; }

    var target_position = new Pos(this.pos.x,this.pos.y).add(this.vector);
    this.pos = target_position;
    this.update();

    var event_at_position = markl.arena.event_at(this.pos,"fighter");

    if(event_at_position){
      console.log(this.name,"at "+this.pos+"("+vector.name+")");
      event_at_position.damage(1);
      event_at_position.knockback(this.vector);
      this.destroy();
    }
  }

  this.destroy = function()
  {
    this.is_active = false;
    this.el.style.display = "none";
  }
}