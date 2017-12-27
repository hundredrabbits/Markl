function Arena(name,size, events = [])
{
  this.name = name;
  this.size = size;
  this.events = events;
  this.effects = [];

  this.el = document.createElement("div");
  this.el.setAttribute("class","arena");
  this.el.style.height = (this.size.height * TILE_SIZE.width)+"px";

  this.background_el = document.createElement("div");
  this.background_el.setAttribute("class","background");
  this.el.appendChild(this.background_el);
  this.foreground_el = document.createElement("div");
  this.foreground_el.setAttribute("class","foreground");
  this.el.appendChild(this.foreground_el);
  this.floor_el = document.createElement("canvas");
  this.floor_el.setAttribute("class","floor");
  this.floor_el.width = 800;
  this.floor_el.height = 800;
  this.el.appendChild(this.floor_el);

  // Create Stage

  this.setup = function()
  {
    this.draw_floor();

    for(var i = 0; i < this.events.length; i++){
      var event = this.events[i];
      console.log("ARENA","Added event: "+event.toString());
      this.el.appendChild(event.el);
    }
  }

  this.draw_floor = function()
  {
    var ctx =  this.floor_el.getContext('2d');
    var sheet = new Image(); sheet.src = "media/floor/dojo.5.png";
    sheet.onload = function(){ 
      for(var x = 0; x < 5; x++){
        for (var y = 0; y < 5; y++){
          ctx.drawImage(sheet, 0, 0, 512, 547,x * 160,(y * 145)+5, 400/2.5, 400/2.5);
        }
      }
    }
  }

  this.start = function()
  {
    for(id in markl.fighters){
      var fighter = markl.fighters[id];
      this.events.push(fighter);
      fighter.spawn_at(this.get_spawn());
    }
    for(id in this.events){
      this.events[id].start();
    }
  }

  this.focus = function()
  {
    var arena_center = new Pos(((this.size.width+1)/2.0),((this.size.height+1)/2.0));

    var characters_average = {x:0,y:0};
    var movement = 5;

    var players_alive = 0.0;
    for(id in markl.fighters){
      if(!markl.fighters[id].is_alive()){ continue; }
      characters_average.x += markl.fighters[id].pos.x+1;
      characters_average.y += markl.fighters[id].pos.y+1;
      players_alive += 1;
    }

    if(players_alive == 4){ movement = 10; }
    if(players_alive == 3){ movement = 20; }
    if(players_alive == 2){ movement = 30; }

    characters_average = {x:characters_average.x/players_alive,y:characters_average.y/players_alive};
    
    var offset = {x:characters_average.x-arena_center.x,y:characters_average.y-arena_center.y};

    $(this.el).animate({ left:(offset.x * -movement),top:(offset.y * movement) }, ACT_SPEED * 0.75);
  }

  this.add_event = function(event)
  {
    this.events.push(event);
    this.el.appendChild(event.el);
  }

  this.add_effect = function(effect)
  {
    this.effects.push(effect);
    this.el.appendChild(effect.el);
  }

  this.update = function()
  {
    for (var i = this.events.length - 1; i >= 0; i--) {
      this.events[i].update();
    }
  }

  this.get_spawn = function()
  {
    for (var i = this.events.length - 1; i >= 0; i--) {
      if(this.events[i].constructor.name === Spawn.name && this.events[i].fighter == null){
        return this.events[i];
      }
    }
    return null;
  }

  this.get_fighters_alive = function()
  {
    var a = [];
    for (var i = markl.fighters.length - 1; i >= 0; i--) {
      if(markl.fighters[i].is_alive() === true){
        a.push(markl.fighters[i]);
      }
    }
    return a;
  }

  this.is_within_limits = function(pos)
  {
    if(pos.x >= 0 && pos.x < this.size.width && pos.y >= 0 && pos.y < this.size.height){
      return true;
    }
    return false;
  }

  this.event_at = function(pos,type = null)
  {
    for(id in this.events) {
      var event = this.events[id];
      if(!event.pos.is_equal(pos)){ continue; }
      if(type && event.type != type){ continue; }
      return event;
    }
    return null;
  }

  this.colliders_at = function(pos)
  {
    var a = [];
    var events = this.events_at(pos);
    for(id in events){
      if(events[id].is_collider == false){ continue; }
      a.push(events[id]);
    }
    return a;
  }

  this.events_at = function(pos,type = null)
  {
    var a = [];
    for(id in this.events) {
      var event = this.events[id];
      if(!event.pos.is_equal(pos)){ continue; }
      if(type && event.type != type){ continue; }
      a.push(event);
    }
    return a;
  }

  this.events_visible_from = function(pos,type = null)
  {
    var sight = [];
    // Right/Left
    for (var x = 1; x < 10; x++){
      var offset = new Pos(x,0);
      var events = this.events_at(pos.add(offset),type);
      if(events.length > 0){ sight = sight.concat(events);break;  }
    }
    for (var x = -1; x > -10; x--){
      var offset = new Pos(x,0);
      var events = this.events_at(pos.add(offset),type);
      if(events.length > 0){ sight = sight.concat(events); break;  }
    }
    // Top
    for (var y = 1; y < 10; y++){
      var target = pos.add(new Pos(0,y)); 
      var events = this.events_at(target,type);
      if(events.length > 0){ sight = sight.concat(events); break;  }
    }
    for (var y = -1; y > -10; y--){
      var target = pos.add(new Pos(0,y)); 
      var events = this.events_at(target,type);
      if(events.length > 0){ sight = sight.concat(events); break;  }
    }
    return sight;
  }
}