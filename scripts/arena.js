function Arena(name,size, events = [])
{
  this.name = name;
  this.size = size;
  this.events = events;

  this.el = document.createElement("div");
  this.el.setAttribute("class","arena");
  this.el.style.height = (this.size.height * TILE_SIZE.width)+"px";

  // Create Stage

  this.setup = function()
  {
    for(var x = 0; x < this.size.width; x++) {
      for (var y = 0; y < this.size.height; y++) {
        var floor = new Floor(new Pos(x,y));
        this.el.appendChild(floor.el);
      }
    }

    for(var i = 0; i < this.events.length; i++){
      var event = this.events[i];
      console.log("Added event:",event.toString());
      this.el.appendChild(event.el);
    }

    markl.el.appendChild(this.el);
  }

  this.start = function()
  {
    for(id in markl.fighters){
      var fighter = markl.fighters[id];
      this.events.push(fighter);
      fighter.spawn_at(this.get_spawn());
    }
    console.log("area is ready")
  }

  this.add_event = function(event)
  {
    this.events.push(event);
    this.el.appendChild(event.el);
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
    for (var x = 1; x < 5; x++){
      var offset = new Pos(x,0);
      var events = this.events_at(pos.add(offset),type);
      if(events.length > 0){ sight = sight.concat(events);break;  }
    }
    for (var x = -1; x > -5; x--){
      var offset = new Pos(x,0);
      var events = this.events_at(pos.add(offset),type);
      if(events.length > 0){ sight = sight.concat(events); break;  }
    }
    // Top
    for (var y = 1; y < 5; y++){
      var target = pos.add(new Pos(0,y)); 
      var events = this.events_at(target,type);
      if(events.length > 0){ sight = sight.concat(events); break;  }
    }
    for (var y = -1; y > -5; y--){
      var target = pos.add(new Pos(0,y)); 
      var events = this.events_at(target,type);
      if(events.length > 0){ sight = sight.concat(events); break;  }
    }
    return sight;
  }

}