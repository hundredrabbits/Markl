function Keyboard()
{
  this.collection = {};

  this.install = function()
  {
    window.addEventListener('keydown', markl.keyboard.key_down);
    window.addEventListener('keyup', markl.keyboard.key_up);
  }

  this.key_up = function(e)
  {
  }

  this.key_down = function(e)
  {
    if(markl.keyboard.collection[e.key]){
      console.log("Found");
      markl.keyboard.collection[e.key]();
      e.preventDefault();
    }
  }

  this.add = function(k,f)
  {
    console.log("Added keyboard",k)
    this.collection[k] = f;
  }
}