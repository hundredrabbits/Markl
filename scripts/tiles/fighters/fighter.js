function Fighter(name,style = null)
{
  Event.call(this, new Pos(0,0));

  this.name = name;
  this.is_collider = true;
  this.status = {action:"idle",vector:"down"};
  this.type = "fighter";
  this.character = null;
  this.score = {hits:0,kills:0};

  this.style = style;
  this.style.host = this;

  this.animator = new Animator(this);
  this.animator.add(new Animation("idle",[0,1,2,3,2,1,0,0,0,0]))
  this.animator.add(new Animation("move",[0,1,2,3]))
  this.animator.add(new Animation("stun",[0]));
  this.animator.add(new Animation("wait",[0,1,2,3,2,1,0,0,0,0]));
  this.animator.add(new Animation("attack",[0,1,2,3,3,3,3,3,3,3,3,3,3,3]));
  this.animator.add(new Animation("fire",[0,1,2,3,3,3,3,3,3,3,3,3,3,3]));

  this.interface = new Fighter_Interface(this);

  this.hp = 4;
  this.hp_max = 4;
  this.stamina = 1000;

  this.sprite = document.createElement("sprite");
  this.el.appendChild(this.sprite);

  this.shadow = document.createElement("shadow");
  this.el.appendChild(this.shadow);

  this.start = function()
  {
    this.el.className = "fighter "+this.character;
    this.el.appendChild(this.interface.el);
  }

  this.setup = function()
  {

  }

  this.spawn_at = function(spawn)
  {
    console.log(this.name,"Spawned at"+spawn.pos.toString())

    markl.arena.el.appendChild(this.el);
    
    spawn.fighter = this;
    this.pos = spawn.pos;

    this.el.setAttribute("style","left:"+this.pos.html().x+"px;top:"+this.pos.html().y+"px");  
    this.update();
  }

  this.update = function(new_class = "")
  {
    if(this.hp < 1 || this.stamina < 1){ 
      this.kill();
    }
    this.interface.update();
  }

  this.act = function()
  {
    this.style.act();
  }

  this.damage = function(val)
  {
    markl.arena.add_effect(new Hit(new Pos(this.pos.x,this.pos.y)));
    this.hp -= val;
    this.update();
  }

  this.kill = function()
  {
    this.el.className = "fighter dead";
    this.is_collider = false;
    this.is_visible = false;
  }

  this.knockback = function(vector)
  {
    var destination = this.pos.add(vector);
    
    if(this.can_move_to(destination)){
      this.pos = destination;
      $(this.el).animate({ top:destination.html().y, left:destination.html().x }, ACT_SPEED/4);
    }
    this.stun();
    this.update();
  }

  this.stun = function()
  {
    this.stamina -= 15;
    this.status.action = "stun";
    this.status.vector = "down";
    this.animator.index = 0;
    this.update();
  }

  this.can_move_to = function(pos)
  {
    if(!markl.arena.is_within_limits(pos)){ return false; }
    if(markl.arena.colliders_at(pos).length > 0){ return false; }

    return true;
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

  this.relative_stamina = function()
  {
    var min_stamina = 9999999;
    var max_stamina = 0;
    for(id in markl.fighters){
      if(!markl.fighters[id].is_alive()){ continue; }
      if(markl.fighters[id].stamina < min_stamina){
        min_stamina = markl.fighters[id].stamina;
      }
      if(markl.fighters[id].stamina > max_stamina){
        max_stamina = markl.fighters[id].stamina;
      }
    }
    return this.stamina - min_stamina;
  }
}