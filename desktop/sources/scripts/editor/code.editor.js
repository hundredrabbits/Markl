function CodeEditor()
{
  this.el = document.createElement('div');
  this.el.id = "code_editor";
  this.textbox = document.createElement('textarea')
  this.highlighter = document.createElement('yu')
  this.highlighter.id = "highlighter"

  this.el.appendChild(this.textbox)
  this.el.appendChild(this.highlighter)

  this.textbox.onchange = () => { this.reload(); }

  this.update = function(history)
  {    
    this.textbox.value = markl.editor.fightscript.render()
    this.highlight(history)
  }

  this.reload = function()
  {
    var fightscript = new FightScript().parse(this.textbox.value)
    console.log(fightscript)
    var is_valid = fightscript.validate()

    if(!is_valid){ console.warn("Invalid fightscript"); return; }

    markl.editor.fightscript = fightscript;
  }

  this.highlight = function(history)
  {
    if(!history){ return; }
    if(history.player.id != 0){ return; }

    var line = markl.editor.fightscript.find(history.reaction)
    this.highlighter.style.top = `${line * 15}px`
  }

  this.status = function(history)
  {
    if(!history){ return; }
    if(history.player.id != 0){ return ""; }

    var line = markl.editor.fightscript.find(history.reaction)
    return `L${line}`
  }
}