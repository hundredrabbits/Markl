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
    this.reload();
  }

  this.reload = function()
  {
    this.state = this.copy(require(`../scenarios/${this.name}`));
  }

  this.inject_style = function(style,player = 0)
  {
    this.state.players[0].style = style;
    console.log(`Updated player#${player} style!`)
  }

  this.run = function()
  {
    console.log(`Running ${this.name}(${this.state.players.length})`)
    this.history = supervisor.render(this.state);
    console.log(`Completed ${this.name}, in ${this.history.length} turns`)
    return this.history;
  }

  this.copy = function(state)
  {
    return JSON.parse(JSON.stringify(state))
  }
}

module.exports = new Scenario()