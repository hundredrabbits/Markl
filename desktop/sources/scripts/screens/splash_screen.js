'use strict';

function SplashScreen()
{
  Screen.call(this,"splash");

  this.run = function(speed = 250)
  {
    if(!markl.scenario || !markl.scenario.script){ console.log("Missing script");return; }

    console.log("Found script!")

    setTimeout(() => {
      markl.flow.goto("fighter");
    },speed)
  }
}

module.exports = SplashScreen