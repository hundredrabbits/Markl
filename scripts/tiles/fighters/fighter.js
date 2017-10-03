function Fighter(name,style)
{
  Event.call(this, new Pos(0,0));

  this.name = name;
  this.style = style;
  this.style.host = this;
  this.is_collider = true;
  this.status = "idle";
  this.type = "fighter";

  this.hp = 3;
  this.stamina = 200;

  this.sprite = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.sprite.setAttribute("class","icon");

  this.sprite_basic = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  this.sprite_basic.setAttribute("cx",TILE_SIZE.width/2);
  this.sprite_basic.setAttribute("cy",TILE_SIZE.height/2);
  this.sprite_basic.setAttribute("r",TILE_SIZE.width * 0.2);

  this.sprite_action = document.createElementNS("http://www.w3.org/2000/svg", "path");

  this.sprite.appendChild(this.sprite_basic);
  this.sprite.appendChild(this.sprite_action);
  this.el.appendChild(this.sprite);

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
    if(this.hp < 1 || this.stamina < 1){ 
      this.el.className = "fighter dead";
      this.is_collider = false;
    }
    this.update_sprite();
    this.update_interface();
  }

  this.act = function()
  {
    this.style.act();
  }

  this.damage = function()
  {
    this.hp -= 1;
    this.update();
  }

  this.knockback = function(origin)
  {
    this.el.className = "fighter knocked";
    var offset = origin.offset(this.pos);
    var destination = this.pos.add(offset.invert());
    
    if(this.can_move_to(destination)){
      this.pos = destination;
      $(this.el).animate({ top:destination.html().y, left:destination.html().x }, ACT_SPEED/4);
    }
    this.stamina -= 10;
    this.update();
  }

  this.can_move_to = function(pos)
  {
    return markl.arena.is_within_limits(pos);
  }

  this.is_alive = function()
  {
    return this.hp > 0 && this.stamina > 0 ? true : false;
  }

  this.find_sights = function()
  {
    return markl.arena.event_visible_from(this.pos);
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
    var html = this.name+" > ";

    // HP
    if(this.hp == 4){
      html += "||||";
    }
    if(this.hp == 3){
      html += "|||<span style='color:red'>|</span>";
    }
    if(this.hp == 2){
      html += "||<span style='color:red'>||</span>";
    }
    if(this.hp == 1){
      html += "|<span style='color:red'>|||</span>";
    }
    if(this.hp == 0){
      html += "<span style='color:red'>||||</span>";
    }

    if(markl.battle){
      var speed = this.stamina - markl.battle.next_fighter().stamina;

      if(this.hp > 0){
        html += " - "+this.status.action+(this.status.action ? "["+this.status.vector+"] " : "");
      }
    }
  
    this.interface.innerHTML = html;
  }

  this.update_sprite = function()
  {
    if(!this.status){
      this.sprite_action.setAttribute("d","");  
      return;
    }

    if(this.status.action == "attack"){
      this.sprite_action.setAttribute("stroke","red");
    }
    else{
      this.sprite_action.setAttribute("stroke","blue");
    }

    if(this.status.vector == "right"){
      this.sprite_action.setAttribute("d","M40,40 l40,0");
    }
    if(this.status.vector == "left"){
      this.sprite_action.setAttribute("d","M40,40 l-40,0");
    }
    if(this.status.vector == "down"){
      this.sprite_action.setAttribute("d","M40,40 l0,40");
    }
    if(this.status.vector == "up"){
      this.sprite_action.setAttribute("d","M40,40 l0,-40");
    }
  }
}