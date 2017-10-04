function Keyboard()
{
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
    if(e.key == " "){
      markl.designer.run();
    }
    if(e.key == "Escape"){
      markl.battle.stop();
    }
  }

}