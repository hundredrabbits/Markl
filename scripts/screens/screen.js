function Screen()
{
  this.name = "Untitled";
  this.el = document.createElement('screen');

  this.start = function()
  {

  }
  
  this.act = function(action)
  {
    console.log(this.name,action)
  }
}