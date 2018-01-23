function Sprite(type,id)
{
  this.el = document.createElement('sprite');
  this.sheet = document.createElement('sheet');
  this.shadow = document.createElement('shadow');
  this.marker = document.createElement('marker');
  this.el.appendChild(this.shadow)
  this.el.appendChild(this.sheet)
  this.el.appendChild(this.marker)

  this.pos = {x:0,y:0};
  this.character = "";
  this.status = "";
  this.vector = "";

  var STAGE = {padding:{x:15,y:15},tile:80}

  this.index = 0;
  this.timer = null;

  this.animate = function()
  {
    if(this.index > 4){ clearInterval(this.timer); this.status = "idle"; return; }

    this.index += 1;
    this.sheet.className = `${this.character} ${this.status} ${this.vector ? this.vector : ""} f${this.index}`;
  }  

  this.setup = function(h)
  {
    this.marker.className = h.id == 0 ? `active` : ``;

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
    this.sheet.className = `${this.character} ${this.status} ${this.vector ? this.vector : ""} f${this.index}`;
    this.el.className = `depth${this.pos.y}`;

    this.index = 0;
    this.timer = setInterval(() => { this.animate(); },50);
  }
}