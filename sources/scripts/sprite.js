function Sprite(type,id)
{
  this.el = document.createElement('sprite');
  this.sheet = document.createElement('sheet');
  this.shadow = document.createElement('shadow');
  this.el.appendChild(this.shadow)
  this.el.appendChild(this.sheet)

  this.pos = {x:0,y:0};
  this.character = "";
  this.status = "";
  this.vector = "";

  var STAGE = {padding:{x:15,y:15},tile:80}

  this.setup = function(h)
  {
    this.el.style.width = `${STAGE.tile}px`;
    this.el.style.height = `${STAGE.tile}px`;
    this.to(h.pos);
  }

  this.to = function(pos)
  {
    this.pos = pos;
    this.el.style.left = `${pos.x * STAGE.tile}px`;
    this.el.style.bottom = `${pos.y * STAGE.tile}px`;
  }

  this.animate_to = function(pos)
  {
    this.to(pos);
  }

  this.set_status = function(s)
  {
    this.status = s;
  }

  this.set_character = function(c)
  {
    this.character = c;
  }

  this.set_vector = function(v)
  {
    this.vector = v;
  }

  this.update = function()
  {
    this.sheet.className = `${this.character} ${this.status} ${this.vector}`;
    this.el.className = `depth${this.pos.y}`;
  }
}