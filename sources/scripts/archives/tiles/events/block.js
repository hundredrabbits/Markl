function Block(pos,id)
{
  Event.call(this,pos);

  this.id = id;
  this.name = "Block";
  this.is_collider = true;
  this.type = "Blocker";
  this.el.className = "blocker id_"+id;

  this.sprite = document.createElement("sprite");

  this.start = function()
  {
    this.el.appendChild(this.sprite);
  }
}