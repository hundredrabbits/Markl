function Designer()
{
  this.el = document.createElement('yu');
  this.el.className = "designer";
  this.input_el = document.createElement('textarea');
  this.hint_el = document.createElement('div');
  this.hint_el.className = "hint";

  this.battle_el = document.createElement('yu');
  this.battle_el.className = "battle";

  this.controller_el = document.createElement('yu');
  this.controller_el.className = "controller";

  this.start_button = document.createElement('yu');
  this.start_button.className = "start button";
  this.start_button.textContent = "Run";

  this.install = function()
  {
    this.el.appendChild(this.battle_el);
    this.el.appendChild(this.input_el);
    this.el.appendChild(this.hint_el);
    this.el.appendChild(this.controller_el);
    this.controller_el.appendChild(this.start_button);
    document.body.appendChild(this.el);
    markl.designer.input_el.addEventListener('input', markl.designer.update);

    for(id in markl.fighters){
      this.battle_el.appendChild(markl.fighters[id].interface.el)
    }
  }

  this.select_style = function(style)
  {
    this.input_el.value = style.text;
    this.update();
  }

  var prev = null;

  this.highlight = function(line, target = null)
  {
    if(prev){ prev.style.backgroundColor = 'transparent'; }

    if(!line){ return; }
    var line_el = document.getElementById("line_"+line);
    line_el.style.backgroundColor = 'red';
    prev = line_el;
  }

  this.update = function()
  {
    for(id in markl.fighters){
      markl.fighters[id].interface.update();
    }

    markl.designer.hint_el.innerHTML = markl.designer.parse();

    markl.designer.start_button.innerHTML = "<b>Run</b> <i>"+markl.designer.input_el.value.split("\n").length+" lines</i>"
  }

  this.parse = function()
  {
    var html = "";
    var lines = this.input_el.value.split("\n");
    for(id in lines){
      var line = lines[id];
      var hint = this.parse_line(line);
      html += "<line id='line_"+id+"' class='"+hint.style+"'><span class='pad'>"+line+"</span> "+hint.text+"</line>";
    }
    return html;
  }

  this.run = function()
  {

  }

  this.parse_line = function(line)
  {
    var text = "";
    var style = "";
    if(line.trim() == "")                { text = ""; }
    else if(line.substr(0,2) == "--")    { text = ""; }
    else if(line.substr(0,6) == "      "){ text = ">> "; }
    else if(line.substr(0,4) == "    ")  { text = " "; }
    else if(line.substr(0,2) == "  ")    { text = ""; }
    else if(line.substr(0,1) != " ")     { text = "Trigger"; style = "trigger"; }
    return {text:text,style:style};
  }
}