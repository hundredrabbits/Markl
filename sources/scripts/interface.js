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
    for(id in this.ui.players){
      var ui = this.ui.players[id];
      ui.update(state.players[id]);
    }
  }
}

function Player_UI(id)
{
  this.el = document.createElement('div');

  this.update = function(h)
  {
    this.el.innerHTML = `HP${h.hp}`;
  }
}