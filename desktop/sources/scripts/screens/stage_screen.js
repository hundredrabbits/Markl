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

  this.run = function()
  {
    const name = Object.keys(stages)[markl.scenario.level];
    this.select(stages[name]);
  }

  this.select = function(stage,speed = 250)
  {
    markl.scenario.set_stage(stage);

    setTimeout(() => {
      markl.flow.goto("arena");
    },speed)
  }
}

module.exports = StageScreen