"use strict";

let Fightscript = require('../server/core/fightscript.js')

function Project()
{
  this.new = function()
  {
    console.log("New FightStyle")
  }

  this.open = function()
  {
    console.log("Open FightStyle")
  }

  this.load_path = function(path)
  {
    console.log(path)

    let data;
    try {
      data = fs.readFileSync(path, 'utf-8');
    } catch (err) {
      console.warn(`Could not load ${path}`);
      return;
    }
    this.load(data);
  }

  this.load = function(script)
  {
    this.fightscript = new Fightscript(script);
    console.log(this.fightscript)
  }
}

module.exports = Project;