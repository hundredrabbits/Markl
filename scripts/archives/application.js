const blessed = require('blessed');

function Application(name)
{
  this.name = name;
  this.is_selected = false;

  this.window = blessed.box({
    top: 2,
    left: 2,
    width: '50%',
    height: '50%',
    style: {
      fg: 'black',
      bg: '#ffffff',
    }
  });

  this.install = function(host)
  {
    console.log("Installing "+this.name)

    host.append(this.window);
  }

  this.select = function()
  {
    this.is_selected = true;
  }
}

module.exports = Application;