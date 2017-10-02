function Designer()
{
  this.el = document.createElement('yu');
  this.el.className = "designer";
  this.input_el = document.createElement('textarea');
  this.hint_el = document.createElement('div');

  this.install = function()
  {
    this.el.appendChild(this.input_el);
    this.el.appendChild(this.hint_el);
    document.body.appendChild(this.el);
  }

  this.load = function(style)
  {
    this.input_el.value = style.text;
    this.update();
  }

  this.update = function()
  {
    this.hint_el.innerHTML = this.parse();
  }

  this.parse = function()
  {
    var html = "";
    var lines = this.input_el.value.split("\n");
    for(id in lines){
      var line = lines[id];
      var hint = this.parse_line(line);
      html += "<line class='"+hint.style+"'><span class='pad'>"+line+"</span> "+hint.text+"</line>";
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
    else if(line.substr(0,4) == "    ")  { text = ""; }
    else if(line.substr(0,2) == "  ")    { text = ""; }
    else if(line.substr(0,1) != " ")     { text = "Trigger"; style = "trigger"; }
    return {text:text,style:style};
  }
}