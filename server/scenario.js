const supervisor  = require('./supervisor')

function Scenario()
{
  this.name = null;
  this.state = null;
  this.history = null;

  this.load = function(name)
  {
    this.name = name;
    console.log(`Loading ${this.name}`)
    this.state = require(`../scenarios/${this.name}`)
  }

  this.inject_style = function(style,player = 0)
  {
    this.state.players[0].style = style;
    console.log(`Updated player#${player} style!`)
  }

  this.run = function()
  {
    console.log(`Running ${this.name}`)
    this.history = supervisor.render(this.state);
    console.log(`Completed ${this.name}`)
    return this.history;
  }
}

module.exports = new Scenario()