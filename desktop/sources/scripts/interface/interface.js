'use strict';

function Interface()
{
  this.el = document.createElement('div');
  this.el.id = "interface"
  this.drag_el = document.createElement('div');
  this.drag_el.id = "drag"

  this.navigator  = new Navigator();

  this.ui = { players:{} };

  this.install = function(host)
  {
    this.navigator.install(this.el);
    
    this.el.appendChild(this.drag_el);
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
    for(let id in state.players){
      let player = state.players[id];
      if(this.ui.players[player.id]){ continue; }
      console.log("Creating ui for ",player.id)
      let ui = new Player_UI(player)
      this.ui.players[player.id] = ui;
      this.el.appendChild(ui.el);
    }
  }

  this.update_ui = function(state,reaction)
  {
    let speed_ranges = {min:null,max:null};

    for(let id in state.players){
      let player = state.players[id];
      if(!speed_ranges.min){ speed_ranges.min = player.sp; }
      if(!speed_ranges.max){ speed_ranges.max = player.sp; }
      if(player.sp < speed_ranges.min){ speed_ranges.min = player.sp; }
      if(player.sp > speed_ranges.max){ speed_ranges.max = player.sp; }
    }

    for(let id in this.ui.players){
      let ui = this.ui.players[id];
      ui.update(state.players[id],speed_ranges);
    }
  }
}