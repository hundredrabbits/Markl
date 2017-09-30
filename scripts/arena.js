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
      this.el.appendChild(event.el);
    }

    markl.el.appendChild(this.el);
  }

  this.start = function()
  {
    for(id in markl.fighters){
      var fighter = markl.fighters[id];
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

  this.get_fighters_visible_from = function(pos)
  {
    var seen = [];

    // Right
    for (var x = 1; x < 5; x++){
      var p = this.fighter_at(pos.add(new Pos(x,0)));
      var b = this.collider_at(pos.add(new Pos(x,0)));
      if(p){ seen.push(p); }
      if(b){ break; }
    }
    // Left
    for (var x = -1; x > -5; x--){
      var p = this.fighter_at(pos.add(new Pos(x,0)));
      var b = this.collider_at(pos.add(new Pos(x,0)));
      if(p){ seen.push(p); }
      if(b){ break; }
    }
    // Top
    for (var y = 1; y < 5; y++){
      var p = this.fighter_at(pos.add(new Pos(0,y)));
      var b = this.collider_at(pos.add(new Pos(0,y)));
      if(p){ seen.push(p); }
      if(b){ break; }
    }
    // Down
    for (var y = -1; y > -5; y--){
      var p = this.fighter_at(pos.add(new Pos(0,y)));
      var b = this.collider_at(pos.add(new Pos(0,y)));
      if(p){ seen.push(p); }
      if(b){ break; }
    }

    // Diagonals
    var tr = this.fighter_at(pos.add(new Pos(1,1)));
    var tl = this.fighter_at(pos.add(new Pos(-1,1)));
    var br = this.fighter_at(pos.add(new Pos(1,-1)));
    var bl = this.fighter_at(pos.add(new Pos(-1,-1)));

    if(tr){ seen.push(tr); }
    if(tl){ seen.push(tl); }
    if(br){ seen.push(br); }
    if(bl){ seen.push(bl); }

    return seen;
  }

  this.collider_at = function(pos)
  {
    for (var i = this.events.length - 1; i >= 0; i--) {
      if(this.events[i].pos.is_equal(pos)){
        return this.events[i];
      }
    }
    return null;
  }

  this.fighter_at = function(pos)
  {
    for (var i = markl.fighters.length - 1; i >= 0; i--) {
      if(markl.fighters[i].is_alive() === true){
        if(markl.fighters[i].pos.x == pos.x && markl.fighters[i].pos.y == pos.y){ 
          return markl.fighters[i];
        }
      }
    }
    return null;
  }
}