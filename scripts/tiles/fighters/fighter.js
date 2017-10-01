function Fighter(name,style)
{
  Event.call(this, new Pos(0,0));

  this.name = name;
  this.style = style;
  this.style.host = this;
  this.is_collider = true;

  this.hp = 9;
  this.stamina = 200;

  // Interface

  this.name_label = document.createElement("span");
  this.name_label.textContent = this.name;
  
  this.interface = document.createElement("div");
  this.interface.setAttribute("class","fighter");
  this.interface.innerHTML = this.name;

  //
  this.el.setAttribute("class","fighter");
  this.el.appendChild(this.name_label);

  this.setup = function()
  {

  }

  this.spawn_at = function(spawn)
  {
    console.log(this.name+" spawn",spawn.pos.toString())

    markl.arena.el.appendChild(this.el);
    
    spawn.fighter = this;
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
    this.update_interface();
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
    return markl.arena.get_fighters_visible_from(this.pos);
  }

  this.find_target = function(sights)
  {
    var candidates = sights;

    for(id in candidates){
      var sighted_fighter = candidates[id];
      var offset = sighted_fighter.pos.offset(this.pos);
      if(Math.abs(offset.x) == 1){ return sighted_fighter; }
      if(Math.abs(offset.y) == 1){ return sighted_fighter; }
    }
    return null;
  }

  this.end_turn = function()
  {
    console.log("End turn");
    return;
  }

  this.update_interface = function()
  {
    var html = "";
    html += this.name+"("+this.hp+"HP/"+this.stamina+"SP/"+this.style.name+") ";
    html += this.style.sights.length > 0 ? "("+this.style.sights.length+(this.style.target ? "->"+this.style.target.name : "")+") " : "";
    this.interface.innerHTML = html;
  }
}