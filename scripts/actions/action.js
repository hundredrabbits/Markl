function Action(host,attr,target)
{
  this.host = host;
  this.attr = attr;
  this.target = target;

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