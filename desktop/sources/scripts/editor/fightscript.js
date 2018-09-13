"use strict";

function FightScript(style = {})
{
  this.style = style;

  this.add = function(rune)
  {
    if(!this.style[rune.trigger]){ this.style[rune.trigger] = {}}
    if(!this.style[rune.trigger][rune.event]){ this.style[rune.trigger][rune.event] = {}}
    if(!this.style[rune.trigger][rune.event][rune.condition]){ this.style[rune.trigger][rune.event][rune.condition] = []}
    if(this.style[rune.trigger][rune.event][rune.condition].indexOf(rune.action) > -1){ console.warn("Rune is already present"); return; }
    this.style[rune.trigger][rune.event][rune.condition].push(rune.action)
  }

  this.insert = function(target,index)
  {
    console.log(`Insert ${target.name} at ${index}`);

    let runes = this.runes();
    runes.splice(index, 0, target);

    let temp = new FightScript()
    for(let id in runes){
      let rune = runes[id]
      temp.add(rune);
    }
    this.parse(temp.render())
    this.refresh();
  }

  this.remove = function(target)
  {
    let runes = this.runes()

    let temp = new FightScript()
    for(let id in runes){
      let rune = runes[id]
      if(target.name == rune.name){ console.log(`Removed ${target.name} at ${id}.`); continue; }
      temp.add(rune);
    }
    this.parse(temp.render())
    this.refresh();
  }

  this.move = function(target,direction)
  {
    let position = this.indexOf(target)
    let index = parseInt(position) + parseInt(direction)

    console.log(`Move ${target.name}[@${position}] toward ${direction} at ${index}`)

    this.remove(target);
    this.insert(target,index)
  }

  this.replace = function(text)
  {
    this.style = this.parse(text)
  }

  this.refresh = function()
  {
    this.style = this.copy().style
  }

  this.parse = function(text)
  {
    let style = {};
    let lines = text.toUpperCase().split("\n");
    let stash = null;
    let trigger = null;
    let event = null;
    let condition = null;
    let action = null;
    for(let id in lines){
      let pad = lines[id].search(/\S|$/);
      let line = lines[id].trim();
      if(line == "" || line.substr(0,1) == "#"){ continue; }
      if(pad == 0){ trigger = line ; style[line] = {}; }
      if(pad == 2){ event = line ; style[trigger][event] = {}; }
      if(pad == 4){ condition = line ; style[trigger][event][condition] = []; }
      if(pad == 6){ action = line ; style[trigger][event][condition].push(line); }
    }
    this.style = style;
    return this;
  }

  this.runes = function()
  {
    let a = [];
    for(let trigger in this.style){
      for(let event in this.style[trigger]){
        for(let condition in this.style[trigger][event]){
          for(let id in this.style[trigger][event][condition]){
            let action = this.style[trigger][event][condition][id];
            a.push(new Rune({trigger:trigger,event:event,condition:condition,action:action}))
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

  this.find = function(reaction,player)
  {
    if(!player){ return null; }
    
    let line = 1
    let text = ""
    for(let trigger in this.style){
      line += 1
      for(let event in this.style[trigger]){
        line += 1
        for(let condition in this.style[trigger][event]){
          line += 1
          for(let id in this.style[trigger][event][condition]){
            let action = this.style[trigger][event][condition][id]
            line += 1
            line += player.tp % this.style[trigger][event][condition].length
            if(trigger == reaction.trigger && event == reaction.event && condition == reaction.condition && action == reaction.action){ return line; }
          }
        }
      }
    }
    return null
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