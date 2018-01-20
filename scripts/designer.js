function Designer()
{
  this.fighter = null;

  this.el = document.createElement('yu');
  this.el.id = "designer";
  this.input_el = document.createElement('textarea');
  this.hint_el = document.createElement('div');
  this.hint_el.className = "hint";

  this.controller_el = document.createElement('yu');
  this.controller_el.className = "controller";

  this.run_button = document.createElement('yu');
  this.run_button.className = "run button";
  this.run_button.textContent = "Run";

  this.hide_button = document.createElement('yu');
  this.hide_button.className = "hide button";
  this.hide_button.textContent = "Hide";

  this.is_running = false;
  this.index = 0;

  this.install = function(host)
  {
    this.el.appendChild(this.input_el);
    this.el.appendChild(this.hint_el);
    this.el.appendChild(this.controller_el);

    this.controller_el.appendChild(this.run_button);
    this.controller_el.appendChild(this.hide_button);

    markl.designer.input_el.addEventListener('input', markl.designer.update);

    this.run_button.addEventListener('click', markl.designer.run_button_click);
    this.hide_button.addEventListener('click', markl.designer.hide_button_click);

    host.appendChild(this.el)
  }

  this.run_button_click = function()
  {
    if(markl.designer.is_running){
      markl.reset(); 
    }
    markl.designer.is_running = markl.designer.is_running ? false : true;
    markl.designer.update();
  }

  this.hide_button_click = function()
  {
    console.log("!")
  }
}