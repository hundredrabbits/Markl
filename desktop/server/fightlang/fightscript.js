'use strict';

let Rune = require('./fightrune')

let Wait = require('../core/actions/wait')

function Fightscript(script = "")
{
  this.host = null;
  this.script = script;
  this.style = parse(script);

  function parse(text)
  {
    let style = {};
    let lines = text.toUpperCase().split("\n");
    let trigger = null;
    let event = null;
    let condition = null;
    let action = null;
    for(let id in lines){
      let pad = lines[id].search(/\S|$/);
      let line = lines[id].trim();
      if(line == "" || line.substr(0,1) == "#"){ continue; }
      if(pad == 0){ trigger = line   ; style[line] = {}; }
      if(pad == 2){ event = line     ; style[trigger][event] = {}; }
      if(pad == 4){ condition = line ; style[trigger][event][condition] = []; }
      if(pad == 6){ action = line    ; style[trigger][event][condition].push(line); }
    }
    return style;
  }

  // 

  this.query = function(trigger,event,condition,action)
  {
    if(!this.style[trigger.toUpperCase()]){ return; }
    if(!this.style[trigger.toUpperCase()][event.toUpperCase()]){ return; }
    if(!this.style[trigger.toUpperCase()][event.toUpperCase()][condition.toUpperCase()]){ return; }

    const actions = this.style[trigger.toUpperCase()][event.toUpperCase()][condition.toUpperCase()];

    for(const id in actions){
      if(action.toUpperCase() == actions[id].toUpperCase()){ return action; }
    }
    return;
  }

  this.find_target = function(triggers,trigger,event,condition)
  {
    if(!triggers[trigger]){ return; }
    if(!triggers[trigger][event]){ return; }
    if(!triggers[trigger][event][condition]){ return; }
    return triggers[trigger][event][condition]
  }

  this.find_actions = function(triggers)
  {
    for(const trigger in this.style){
      for(const event in this.style[trigger]){
        for(const condition in this.style[trigger][event]){
          const target = this.find_target(triggers,trigger,event,condition);
          if(target){
            const actions = this.style[trigger][event][condition]
            return {target:target,trigger:trigger,event:event,condition:condition,actions:actions}; 
          }
        }
      }
    }
    return;
  }

  this.react = function(triggers)
  {
    // Go through style
    const actions = this.find_actions(triggers);

    console.log("!!!!!",actions);

    return Wait;
  }

  // TODO: TO CLEAN v

  this.runes = function()
  {
    let a = [];
    for(let trigger in this.style){
      for(let event in this.style[trigger]){
        for(let condition in this.style[trigger][event]){
          for(let id in this.style[trigger][event][condition]){
            let action = this.style[trigger][event][condition][id];
            a.push(new Fightrune({trigger:trigger,event:event,condition:condition,action:action}))
          }
        }
      }
    }
    return a
  }
  
  this.render = function()
  {
    let text = ""
    for(let trigger in this.style){
      text += `${trigger}\n`
      for(let event in this.style[trigger]){
        text += `  ${event}\n`
        for(let condition in this.style[trigger][event]){
          text += `    ${condition}\n`
          for(let id in this.style[trigger][event][condition]){
            text += `      ${this.style[trigger][event][condition][id]}\n`
          }
        }
      }
    }
    return text
  }

  this.toString = function()
  {
    let text = ""
    for(let trigger in this.style){
      text += trigger+' '
      for(let event in this.style[trigger]){
        text += event+' '
        for(let condition in this.style[trigger][event]){
          text += condition+' '
          for(let id in this.style[trigger][event][condition]){
            text += this.style[trigger][event][condition][id]
          }
        }
      }
    }
    return text.trim()
  }

  this.indexOf = function(target)
  {
    let runes = this.runes();
    for(let id in runes){
      let rune = runes[id]
      if(rune.name == target.name){ return parseInt(id); }
    }
    return -1
  }

  this.copy = function()
  {
    let style = JSON.parse(JSON.stringify(this.style))
    return new FightScript(style)
  }

  this.validate = function()
  {
    let runes = this.runes()
    for(let id in runes){
      let rune = runes[id];
      let is_valid = rune.validate();
      if(!is_valid){ return false; }
    }
    return true;
  }
}

module.exports = Fightscript;
