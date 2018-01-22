function Effect(name,pos)
{
  this.el = document.createElement('effect');
  this.sheet = document.createElement('sheet');
  this.el.appendChild(this.sheet)

  this.name = name;
  this.pos = pos;

  var STAGE = {padding:{x:15,y:15},tile:80}

  this.el.style.width = `${STAGE.tile}px`;
  this.el.style.height = `${STAGE.tile}px`;
  this.el.style.left = `${this.pos.x * STAGE.tile}px`;
  this.el.style.bottom = `${this.pos.y * STAGE.tile}px`;
}