function Character_Screen()
{
  Screen.call(this);

  this.name = "character selection";
  this.index = 3;

  this.el.className = "character_selection";
  this.el.innerHTML = `
  <yu class='character'><yu id='portrait_patience' class='portrait patience'></yu><yu class='frame'></yu><h2>Patience<small>HP2</small></h2></yu>
  <yu class='character'><yu id='portrait_sin' class='portrait sin'></yu><yu class='frame'></yu><h2>Sin<small>HP1</small></h2></yu>
  <yu class='character'><yu id='portrait_lancer' class='portrait lancer'></yu><yu class='frame'></yu><h2>Lancer<small>HP3</small></h2></yu>
  <yu class='character'><yu id='portrait_pest' class='portrait pest'></yu><yu class='frame'></yu><h2>Pest<small>HP4</small></h2></yu>
  `;

  this.start = function()
  {
    console.info("CHARACTER SELECTION","start")

    if(markl.fighter && markl.fighter.character){
      this.leave();
      return;
    }
    this.next();
  }

  this.next = function()
  {
    var s = this;
    this.index += 1;
    this.index = this.index % 4;

    this.move_to(this.index);

    var fighter = markl.fighter;
    var triggers = this.find_triggers(fighter);
    var reaction = fighter.style.react(triggers);

    
    if(reaction && reaction.actions[0].name == "SELECT" && markl.designer.is_running){
      this.select_character(reaction.target);
      markl.designer.update(fighter,parseInt(reaction.actions[0].line),reaction.target);
    }
    
    if(markl.fighter && markl.fighter.character){
      this.leave();
      return;
    }
    setTimeout(function(){ s.next(); }, ACT_SPEED * 8);
  }

  this.select_character = function(name)
  {
    var fighter_name = capitalize(name);
    var style_text = new Style("WHAT",markl.fighter.style.text);
    markl.select_fighter(new window[fighter_name]("USER",style_text));

    var p_patience = document.getElementById("portrait_patience");
    var p_sin = document.getElementById("portrait_sin");
    var p_pest = document.getElementById("portrait_pest");

    var speed = ACT_SPEED * 8;
    $(p_patience).animate({ opacity:0 }, speed);
    $(p_sin).animate({  opacity:0 }, speed);
    $(p_pest).animate({ opacity:0 }, speed);
  }

  function capitalize(s)
  {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  }

  this.find_triggers = function()
  {
    var names = ["PATIENCE","SIN","LANCER","PEST"];
    var name_is = "NAME IS "+names[this.index];
    var triggers = {"MENU":{"CHARACTER":{}}};
    triggers["MENU"]["CHARACTER"][name_is] = names[this.index];

    return triggers;
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

  this.leave = function()
  {
    console.log("LEAVE")
    markl.select_opponents([new Sin("CPU1",new Style("idle",custom_style)),new Patience("CPU2",new Style("idle",custom_style)),new Pest("CPU3",new Style("idle",custom_style))]);
    markl.show(new Arena_Screen());
    markl.designer.update();
  }
}