'use strict';

function ArenaScreen()
{
  Screen.call(this,"arena");

  this.run = function()
  {
    console.log("arena!")
    markl.scenario.run();
  }
}

module.exports = ArenaScreen