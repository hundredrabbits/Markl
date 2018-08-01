function CodeEditor()
{
  this.el = document.createElement('div');
  this.el.id = "code_editor";
  this.textbox = document.createElement('textarea')
  this.hint = document.createElement('div')
  this.hint.id = "hint"
  this.highlighter = document.createElement('yu')
  this.highlighter.id = "highlighter"

  this.el.appendChild(this.textbox)
  this.el.appendChild(this.highlighter)
  this.el.appendChild(this.hint)

  this.textbox.onchange = () => { this.reload(); }

  this.update = function(history)
  {    
    this.textbox.disabled = markl.editor.is_running;
    this.textbox.value = markl.editor.fightscript.render()
    this.update_hint(history);
    this.update_highlight(history)
  }

  this.reload = function()
  {
    var fightscript = new FightScript().parse(this.textbox.value)
    var is_valid = fightscript.validate()

    if(!is_valid){ console.warn("Invalid fightscript"); return; }

    markl.editor.replace(fightscript);
  }

  this.update_hint = function()
  {
    var html = ""

    var i = 1;
    while(i < 30){
      html += `<t class='number'>${i}</t><br/>`
      i += 1
    }
    this.hint.innerHTML = html;
  }

  this.update_highlight = function(history)
  {
    if(!history || !history.player || history.player.id != 0){ this.highlighter.className = "disabled"; return; }

    this.highlighter.className = ""
    var line = markl.editor.fightscript.find(history.reaction,history.player)
    this.highlighter.style.top = `${line * 20}px`
  }

  this.status = function(state)
  {
    return ''
  }
}