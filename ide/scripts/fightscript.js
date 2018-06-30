function FightScript(style = {})
{
  this.style = style;

  this.add = function(rune)
  {
    if(!this.style[rune.trigger]){ this.style[rune.trigger] = {}}
    if(!this.style[rune.trigger][rune.event]){ this.style[rune.trigger][rune.event] = {}}
    if(!this.style[rune.trigger][rune.event][rune.condition]){ this.style[rune.trigger][rune.event][rune.condition] = []}
    this.style[rune.trigger][rune.event][rune.condition].push(rune.action)
  }

  this.export = function()
  {
    var text = ""
    for(trigger in this.style){
      text += `${trigger}\n`
      for(event in this.style[trigger]){
        text += `  ${event}\n`
        for(condition in this.style[trigger][event]){
          text += `    ${condition}\n`
          for(id in this.style[trigger][event][condition]){
            text += `      ${this.style[trigger][event][condition][id]}\n`
          }
        }
      }
    }
    return text
  }
}