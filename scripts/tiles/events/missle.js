function Missle(pos)
{
  Event.call(this,pos);

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