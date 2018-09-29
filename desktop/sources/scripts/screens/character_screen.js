'use strict';

function CharacterScreen()
{
  Screen.call(this,"character");

  this.run = function()
  {
    const characters = ["pest","lancer","sin","patience"];
    for(const id in characters){
      let response = markl.fightscript.query("menu","character","name is "+characters[id],"select")
      if(response != "select"){ continue; }
      this.select(characters[id]);
    }
  }

  this.select = function(character)
  {
    console.log("character",character)
  }
}

module.exports = CharacterScreen