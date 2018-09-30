'use strict';

function CharacterScreen()
{
  Screen.call(this,"character");

  const characters = ["pest","lancer","sin","patience"];

  this.run = function()
  {
    for(const id in characters){
      let response = markl.fightscript.query("menu","character","name is "+characters[id],"select")
      if(response != "select"){ continue; }
      this.select(characters[id]);
    }
  }

  this.select = function(character)
  {
    console.log("character",character)
    markl.fightscript.character = character;
    
    setTimeout(() => {
      markl.flow.goto("stage");
    },500)
  }
}

module.exports = CharacterScreen