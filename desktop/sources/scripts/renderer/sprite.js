function Sprite(type,id)
{
  this.el = document.createElement('sprite');
  this.sheet = document.createElement('sheet');
  this.shade = document.createElement('shade');
  this.marker = document.createElement('marker');
  this.el.appendChild(this.sheet)
  this.el.appendChild(this.shade)
  this.el.appendChild(this.marker)

  this.pos = {x:0,y:0};
  this.character = "";
  this.status = "";
  this.vector = "";

  var STAGE = {padding:{x:15,y:15},tile:80}

  this.setup = function(h)
  {
    this.marker.className = h.id == 0 ? `active` : ``;

    this.el.style.transition = `all ${TIMING.sprite}ms`;
    this.el.style.width = `${STAGE.tile}px`;
    this.el.style.height = `${STAGE.tile}px`;
    this.to(h.pos);
  }

  this.to = function(pos)
  {
    this.pos = pos;
    this.el.style.transform = `translate(${pos.x * STAGE.tile}px, ${pos.y * STAGE.tile}px)`
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
    this.el.className = `depth${this.pos.y} ${this.character} ${this.status} ${this.vector ? this.vector : ""}`;
  }
}