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

  this.run_button = document.createElement('yu');
  this.run_button.className = "run button";
  this.run_button.textContent = "Run";

  this.is_running = false;
  this.index = 0;

  this.install = function()
  {
    this.el.appendChild(this.header_el);
    this.el.appendChild(this.input_el);
    this.el.appendChild(this.hint_el);
    this.el.appendChild(this.controller_el);
    this.controller_el.appendChild(this.run_button);
    document.body.appendChild(this.el);
    markl.designer.input_el.addEventListener('input', markl.designer.update);

    for(id in markl.fighters){
      this.header_el.appendChild(markl.fighters[id].interface.el)
    }
    this.run_button.addEventListener('click', markl.designer.run_button_click);
  }

  this.run_button_click = function()
  {
    if(markl.designer.is_running){
      markl.reset(); 
    }
    markl.designer.is_running = markl.designer.is_running ? false : true;
    markl.designer.update();
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
    if(!markl.designer.is_running){ return; }
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

    if(markl.designer.is_running){
      markl.designer.run_button.innerHTML = "Running..";
    }
    else{
      markl.designer.run_button.innerHTML = "<b>Run</b> <i>"+markl.designer.input_el.value.split("\n").length+" lines</i>"  
    }
  }

  this.update_header = function()
  {
    var html = "<t class='right'>"+(markl.screen ? markl.screen.name : 'Error')+"</t>";

    for(id in markl.fighters){
      html += "<span id='style_"+id+"' class='"+(id == markl.designer.index ? "active" : "")+"'>"+markl.fighters[id].name+"</span> ";
    }

    this.header_el.innerHTML = html;
    if(document.getElementById("style_0")){ document.getElementById("style_0").addEventListener('click', markl.designer.tab_click); };
    if(document.getElementById("style_1")){ document.getElementById("style_1").addEventListener('click', markl.designer.tab_click); };
    if(document.getElementById("style_2")){ document.getElementById("style_2").addEventListener('click', markl.designer.tab_click); };
    if(document.getElementById("style_3")){ document.getElementById("style_3").addEventListener('click', markl.designer.tab_click); };
  }

  this.tab_click = function(e)
  {
    var index = parseInt(e.target.id.replace("style_",""));
    markl.designer.index = index;
    markl.designer.select_style(markl.fighters[index].style);
    markl.designer.update();
  }

  this.parse = function()
  {
    var html = "";
    var lines = this.input_el.value.split("\n");
    for(id in lines){
      var line = lines[id];
      var hint = this.parse_line(line);
      html += "<line id='line_"+id+"' class='"+hint.style+" "+(id == this.line_highlight ? "highlight" : "")+"'><span class='line_number'>"+id+"</span><span class='pad'>"+line+"</span> "+hint.text+"</line>";
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