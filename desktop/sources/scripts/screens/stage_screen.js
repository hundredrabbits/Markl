'use strict';

const Dojo1v0    = require('../server/core/stages/dojo_1v0');
const Gardens1v2 = require('../server/core/stages/gardens_1v2');
const Woods1v3   = require('../server/core/stages/woods_1v3');
const Temple1v4  = require('../server/core/stages/temple_1v4');
const Roof1v1    = require('../server/core/stages/roof_1v1');

function StageScreen()
{
  Screen.call(this,"stage");

  this.index = -1;

  const stages = {
    dojo_1v0: Dojo1v0,
    gardens_1v2: Gardens1v2,
    woods_1v3: Woods1v3,
    temple_1v4: Temple1v4,
    roof_1v1: Roof1v1
  };

  this.run = function()
  {
    this.index++;
    const name = Object.keys(stages)[this.index];
    this.select(stages[name]);
  }

  this.select = function(stage)
  {
    markl.scenario.set_stage(stage);

    setTimeout(() => {
      markl.flow.goto("arena");
    },500)
  }
}

module.exports = StageScreen