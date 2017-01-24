function Player(name,style)
{
  Event.call(this);

  this.name = name;
  this.style = style;
  this.style.host = this;
  this.is_collider = true;

  this.hp = 9;
  this.stamina = 9;

  // Interface
  
  this.interface = document.createElement("div");
  this.interface.setAttribute("class","player");
  this.interface.innerHTML = this.name;

  //
  this.element.setAttribute("class","player");

  this.ready = function(spawn)
  {
    spawn.player = this;
    this.pos = spawn.pos;

    this.element.setAttribute("style","left:"+this.pos.html().x+"px;top:"+this.pos.html().y+"px");  
    this.update();
  }

  this.update = function()
  {
    this.interface.innerHTML = this.name+"("+this.hp+"/"+this.stamina+") - "+this.style.name;
  }

  this.act = function()
  {
    this.style.act();
  }

  this.is_alive = function()
  {
    return this.hp > 0 ? true : false;
  }

  this.find_sights = function()
  {
    return markl.arena.get_players_visible_from(this.pos);
  }
}