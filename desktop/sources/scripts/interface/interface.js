function Interface()
{
  this.el = document.createElement('yu');
  this.el.id = "interface"

  this.ui = { players:{} };

  this.install = function(host)
  {
    host.appendChild(this.el);
  }

  this.update = function(state,reaction)
  {
    if(!state){ return; }

    this.verify_ui(state);
    this.update_ui(state,reaction);
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

  this.update_ui = function(state,reaction)
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