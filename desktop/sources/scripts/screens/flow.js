'use strict';

function Flow()
{
  this.el = document.createElement('div');
  this.el.id = "flow";

  this.active = null;
  this.screens = {};

  this.install = function(host)
  {
    const screens = {
      "character": new CharacterScreen(),
      "stage": new StageScreen(),
      "arena": new ArenaScreen()
    }
    for(const id in screens){
      this.screens[id] = screens[id]
      this.screens[id].install(this.el);
    }

    host.appendChild(this.el)
  }

  this.start = function()
  {
    for(const id in this.screens){
      this.screens[id].start();
      this.active = id;
    }
  }

  this.update = function()
  {

  }

  this.goto = function(screen_id)
  {
    if(!this.screens[screen_id]){ console.warn(`Unknown screen: ${screen_id}`); return; }
    
    this.screens[this.active].hide();
    this.active = screen_id;
    this.screens[this.active].show();
  }
}

module.exports = Flow;