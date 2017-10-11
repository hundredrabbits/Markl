function Stage(name,arena,fighters,theme)
{
  this.name = name;
  this.arena = arena;
  this.fighters = fighters;
  this.theme = theme;
  this.is_complete = false;

  this.toString = function()
  {
    var html = "";
    html += "<b>"+this.name+"</b>."+this.theme+"["+this.is_complete+"] -> ";

    for(id in this.fighters){
      html += this.fighters[id].character+"("+this.fighters[id].style.name+") ";
    }
    return html;
  }
}