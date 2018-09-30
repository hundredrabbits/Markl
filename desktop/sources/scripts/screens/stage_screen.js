'use strict';

function StageScreen()
{
  Screen.call(this,"stage");

  this.index = -1;

  const stages = [
    "dojo_dummy",
    "dojo_1v1",
    "dojo_1v2",
    "gardens_1v1",
    "gardens_1v2",
    "gardens_1v3",
    "temple_1v2",
    "temple_1v3",
    "temple_1v4",
    "woods_1v3",
    "woods_1v4",
    "roof_1v1"
  ];

  this.run = function()
  {
    this.index++;
    this.select(stages[this.index]);
  }

  this.select = function(stage)
  {
    console.log("stage",stage)

    markl.scenario.set_stage(stage);

    setTimeout(() => {
      markl.flow.goto("arena");
    },500)
  }
}

module.exports = StageScreen