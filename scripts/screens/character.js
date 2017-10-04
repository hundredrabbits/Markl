function Character_Screen()
{
  Screen.call(this);

  this.index = 0;

  this.el.className = "character_selection";
  this.el.innerHTML = `
  <yu class='character'><yu id='portrait_patience' class='portrait patience'></yu><yu class='frame'></yu><h2>Patience<small>HP2</small></h2></yu>
  <yu class='character'><yu id='portrait_sin' class='portrait sin'></yu><yu class='frame'></yu><h2>Sin<small>HP1</small></h2></yu>
  <yu class='character'><yu id='portrait_lancer' class='portrait lancer'></yu><yu class='frame'></yu><h2>Lancer<small>HP3</small></h2></yu>
  <yu class='character'><yu id='portrait_pest' class='portrait pest'></yu><yu class='frame'></yu><h2>Pest<small>HP4</small></h2></yu>
  `;

  this.start = function()
  {
    this.next();
  }

  this.next = function()
  {
    var s = this;
    this.index += 1;
    this.index = this.index % 4;

    this.move_to(this.index);
    setTimeout(function(){ s.next(); }, ACT_SPEED * 8);
  }

  this.move_to = function(index)
  {
    var p_patience = document.getElementById("portrait_patience");
    var p_sin = document.getElementById("portrait_sin");
    var p_lancer = document.getElementById("portrait_lancer");
    var p_pest = document.getElementById("portrait_pest");

    var pad = 5;
    var speed = ACT_SPEED * 4;

    if(index == 0){
      $(p_patience).animate({ left:0, opacity:1 }, speed);
      $(p_sin).animate({ left:pad*1, opacity:0.75 }, speed);
      $(p_lancer).animate({ left:pad*1.25, opacity:0.75 }, speed);
      $(p_pest).animate({ left:pad*1.5, opacity:0.75 }, speed);
    }
    else if(index == 1){
      $(p_patience).animate({ left:-pad*1, opacity:0.75 }, speed);
      $(p_sin).animate({ left:0, opacity:1 }, speed);
      $(p_lancer).animate({ left:pad*1, opacity:0.75 }, speed);
      $(p_pest).animate({ left:pad*1.25, opacity:0.75 }, speed);
    }
    else if(index == 2){
      $(p_patience).animate({ left:-pad*1.25, opacity:0.75 }, speed);
      $(p_sin).animate({ left:-pad*1, opacity:0.75 }, speed);
      $(p_lancer).animate({ left:0, opacity:1 }, speed);
      $(p_pest).animate({ left:pad*1, opacity:0.75 }, speed);
    }
    else if(index == 3){
      $(p_patience).animate({ left:-pad*1.5, opacity:0.75 }, speed);
      $(p_sin).animate({ left:-pad*1.25, opacity:0.75 }, speed);
      $(p_lancer).animate({ left:-pad*1, opacity:0.75 }, speed);
      $(p_pest).animate({ left:0, opacity:1 }, speed);
    }
  }

}