function Wall(pos)
{
  Event.call(this,pos);

  this.name = "Wall";
  this.is_collider = true;
}