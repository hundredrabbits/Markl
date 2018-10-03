'use strict';

const Dojo1v0    = require('../server/stages/dojo_1v0');
const Gardens1v2 = require('../server/stages/gardens_1v2');
const Woods1v3   = require('../server/stages/woods_1v3');
const Temple1v4  = require('../server/stages/temple_1v4');
const Roof1v1    = require('../server/stages/roof_1v1');

function StageScreen()
{
  Screen.call(this,"stage");

  const stages = {
    dojo_1v0: Dojo1v0,
    gardens_1v2: Gardens1v2,
    woods_1v3: Woods1v3,
    temple_1v4: Temple1v4,
    roof_1v1: Roof1v1
  };

  // Elements

  this.stage_garden  = document.createElement('div'); this.stage_garden.className = "stage";  this.stage_garden.id = `stage_garden`;
  this.stage_dojo    = document.createElement('div'); this.stage_dojo.className = "stage";    this.stage_dojo.id = `stage_dojo`;
  this.stage_wood    = document.createElement('div'); this.stage_wood.className = "stage";    this.stage_wood.id = `stage_wood`;
  this.stage_dungeon = document.createElement('div'); this.stage_dungeon.className = "stage"; this.stage_dungeon.id = `stage_dungeon`;
  this.stage_rooftop = document.createElement('div'); this.stage_rooftop.className = "stage"; this.stage_rooftop.id = `stage_rooftop`;

  this.install = function(host)
  {
    console.log("!!")
    this.el.appendChild(this.stage_garden);
    this.el.appendChild(this.stage_dojo);
    this.el.appendChild(this.stage_wood);
    this.el.appendChild(this.stage_dungeon);
    this.el.appendChild(this.stage_rooftop);

    host.appendChild(this.el);
  }

  this.run = function()
  {
    const name = Object.keys(stages)[markl.scenario.level];
    this.select(stages[name]);
  }

  this.select = function(stage,speed = 4000)
  {
    markl.scenario.set_stage(stage);

    var el = this.el;
    setTimeout(() => {
      el.className = "stage animate";
      // markl.flow.goto("arena");
    },speed)
  }
}

module.exports = StageScreen