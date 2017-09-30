function Fighter(name,style)
{
  Event.call(this, new Pos(0,0));

  this.name = name;
  this.style = style;
  this.style.host = this;
  this.is_collider = true;

  this.hp = 9;
  this.stamina = 10;

  // Interface
  
  this.interface = document.createElement("div");
  this.interface.setAttribute("class","player");
  this.interface.innerHTML = this.name;

  //
  this.el.setAttribute("class","player");

  this.setup = function()
  {

  }

  this.spawn_at = function(spawn)
  {
    console.log(this.name+" spawn",spawn.pos.toString())

    markl.arena.el.appendChild(this.el);
    
    spawn.player = this;
    this.pos = spawn.pos;

    this.el.setAttribute("style","left:"+this.pos.html().x+"px;top:"+this.pos.html().y+"px");  
    this.update();
  }

  this.update = function(new_class = "")
  {
    if(this.hp < 1){ 
      $(this.el).addClass("dead"); 
      this.is_collider = false;
    }
    this.interface.innerHTML = this.name+"("+this.hp+"HP/"+this.stamina+"SP) - "+this.style.name;
  }

  this.act = function()
  {
    console.log(this.name,"style."+this.style.name)
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

  this.end_turn = function()
  {
    console.log("End turn");
    return;
  }
}