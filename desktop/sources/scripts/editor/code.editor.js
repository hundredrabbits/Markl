function CodeEditor()
{
  this.el = document.createElement('div');
  this.el.id = "code_editor";
  this.textbox = document.createElement('textarea')
  this.hint = document.createElement('hint')

  this.el.appendChild(this.hint)
  this.el.appendChild(this.textbox)

  this.textbox.onchange = () => { this.reload_code(); console.log("!!!"); }

  this.update = function()
  {
    this.textbox.value = markl.editor.fightscript.render()
  }
}