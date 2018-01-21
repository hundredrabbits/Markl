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

  this.run = function()
  {
    console.log(`Running ${this.name}`)
    this.history = supervisor.render(this.state);
    console.log(`Completed ${this.name}`)
  }
}

module.exports = new Scenario()