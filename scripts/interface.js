function Interface()
{
  this.el = document.createElement("div");
  this.el.setAttribute("id","interface");

  this.start = function()
  {
    console.log("interface start")
    markl.el.appendChild(this.el);

    for(id in markl.fighters){
      this.el.appendChild(markl.fighters[id].interface);
    }
  }

  this.update = function()
  {
    for(id in markl.fighters){
      markl.fighters[id].update_interface();
    }
  }
}