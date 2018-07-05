function Interface()
{
  this.el = document.createElement('interface');

  this.ui = { players:{} };

  this.install = function(host)
  {
    host.appendChild(this.el);
  }

  this.update = function(state)
  {
    if(!state){ return; }

    this.verify_ui(state);
    this.update_ui(state);
  }

  this.verify_ui = function(state)
  {
    for(id in state.players){
      var player = state.players[id];
      if(this.ui.players[player.id]){ continue; }
      console.log("Creating ui for ",player.id)
      var ui = new Player_UI(player.id)
      this.ui.players[player.id] = ui;
      this.el.appendChild(ui.el);
    }
  }

  this.update_ui = function(state)
  {
    var speed_ranges = {min:null,max:null};

    for(id in state.players){
      var player = state.players[id];
      if(!speed_ranges.min){ speed_ranges.min = player.sp; }
      if(!speed_ranges.max){ speed_ranges.max = player.sp; }
      if(player.sp < speed_ranges.min){ speed_ranges.min = player.sp; }
      if(player.sp > speed_ranges.max){ speed_ranges.max = player.sp; }
    }

    for(id in this.ui.players){
      var ui = this.ui.players[id];
      ui.update(state.players[id],speed_ranges);
    }
  }
}

function Player_UI(id)
{
  this.el = document.createElement('div');
  this.el.className = `ui player${id}`;
  this.name_el = document.createElement('t'); this.name_el.className = "name";
  this.health_el = document.createElement('t'); this.health_el.className = "health";
  this.stamina_el = document.createElement('t'); this.stamina_el.className = "stamina";

  this.health_progress = document.createElement('wr'); this.health_progress.className = "health"
  this.stamina_progress = document.createElement('wr'); this.stamina_progress.className = "stamina"
  this.health_bar = document.createElement('bar');
  this.stamina_bar = document.createElement('bar');

  this.health_progress.appendChild(this.health_bar);
  this.stamina_progress.appendChild(this.stamina_bar);

  this.el.appendChild(this.name_el);
  this.el.appendChild(this.health_el);
  this.el.appendChild(this.stamina_el);
  this.el.appendChild(this.health_progress);
  this.el.appendChild(this.stamina_progress);

  this.update = function(h,speed_ranges)
  {
    var relative_speed = h.sp - speed_ranges.max;
    var sum_speed = speed_ranges.min - speed_ranges.max
    var actual_speed = (sum_speed - relative_speed) * -1
    var ratio_speed = actual_speed/-sum_speed;

    this.name_el.textContent = h.name;
    this.health_el.textContent = `${h.hp}HP`;
    this.stamina_el.textContent = ` ${actual_speed}SP(${ratio_speed.toFixed(2)})`;
    this.health_bar.style.width = `${(h.hp/4) * 100}%`
    this.stamina_bar.style.width = `${ratio_speed * 100}%`
  }
}