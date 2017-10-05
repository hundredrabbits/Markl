function Designer()
{
  this.style = null;

  this.el = document.createElement('yu');
  this.el.className = "designer";
  this.input_el = document.createElement('textarea');
  this.hint_el = document.createElement('div');
  this.hint_el.className = "hint";

  this.header_el = document.createElement('yu');
  this.header_el.className = "header";

  this.controller_el = document.createElement('yu');
  this.controller_el.className = "controller";

  this.start_button = document.createElement('yu');
  this.start_button.className = "start button";
  this.start_button.textContent = "Run";

  this.install = function()
  {
    this.el.appendChild(this.header_el);
    this.el.appendChild(this.input_el);
    this.el.appendChild(this.hint_el);
    this.el.appendChild(this.controller_el);
    this.controller_el.appendChild(this.start_button);
    document.body.appendChild(this.el);
    markl.designer.input_el.addEventListener('input', markl.designer.update);

    for(id in markl.fighters){
      this.header_el.appendChild(markl.fighters[id].interface.el)
    }
  }

  this.select_style = function(style)
  {
    this.style = style;
    this.input_el.value = style.text;
    this.update();
  }

  this.line_highlight = 0;

  this.run = function(triggers)
  {
    var reaction = this.style.react(triggers);
    if(!reaction){ console.log("No reaction",triggers); return; }

    var actions = reaction ? reaction.actions : reaction;
    var action = actions[0];
    this.line_highlight = action.line;

    markl.screen.act(reaction);
  }

  this.update = function()
  {
    markl.designer.update_header();

    for(id in markl.fighters){
      markl.fighters[id].interface.update();
    }

    markl.designer.hint_el.innerHTML = markl.designer.parse();

    markl.designer.start_button.innerHTML = "<b>Running..</b> <i>"+markl.designer.input_el.value.split("\n").length+" lines</i>"
  }

  this.update_header = function()
  {
    var html = "";

    for(id in markl.fighters){
      html += "<span class='"+(markl.fighters[id].name == "USER" ? "active" : "")+"'>"+markl.fighters[id].name+"</span> ";
    }

    this.header_el.innerHTML = html;
  }

  this.parse = function()
  {
    var html = "";
    var lines = this.input_el.value.split("\n");
    for(id in lines){
      var line = lines[id];
      var hint = this.parse_line(line);
      html += "<line id='line_"+id+"' class='"+hint.style+" "+(id == this.line_highlight ? "highlight" : "")+"'><span class='pad'>"+line+"</span> "+hint.text+"</line>";
    }
    return html;
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