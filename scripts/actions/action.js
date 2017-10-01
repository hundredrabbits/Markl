function Action()
{
  this.host = null;
  this.name = null;
  this.cost = 1;

  this.play = function(host)
  {
    this.host = host;
    this.run();
  }

  this.run = function()
  {

  }

  this.end = function()
  {

  }
}