function Designer()
{
  this.fighter = null;

  this.el = document.createElement('yu');
  this.el.id = "designer";
  this.input_el = document.createElement('textarea');
  this.hint_el = document.createElement('div');
  this.hint_el.className = "hint";

  this.controls_el = document.createElement('yu');
  this.controls_el.className = "controls";

  this.run_button = document.createElement('yu');
  this.run_button.className = "run button";
  this.run_button.textContent = "Run";

  this.stop_button = document.createElement('yu');
  this.stop_button.className = "stop button";
  this.stop_button.textContent = "Stop";

  this.hide_button = document.createElement('yu');
  this.hide_button.className = "hide button";
  this.hide_button.textContent = "Hide";

  this.is_running = false;
  this.index = 0;

  this.install = function(host)
  {
    this.el.appendChild(this.input_el);
    this.el.appendChild(this.hint_el);
    this.el.appendChild(this.controls_el);

    this.input_el.value = `SIGHT
  FIGHTER
    DISTANCE IS 4
      MOVE TOWARD
    DISTANCE IS 3
      FIRE TOWARD
    DISTANCE IS 2
      DASH TOWARD
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE TOWARD
  OBJECT
    DISTANCE IS 1
      ATTACK TOWARD
  PROJECTILE
    DEFAULT
      STEP
DEFAULT
  DEFAULT
    DEFAULT
      MOVE ANY`;

    this.controls_el.appendChild(this.run_button);
    this.controls_el.appendChild(this.stop_button);
    this.controls_el.appendChild(this.hide_button);

    markl.designer.input_el.addEventListener('input', markl.designer.update);

    this.run_button.addEventListener('click', markl.designer.run_button_click);
    this.stop_button.addEventListener('click', markl.designer.stop_button_click);
    this.hide_button.addEventListener('click', markl.designer.hide_button_click);

    host.appendChild(this.el)
  }

  this.run_button_click = function()
  {
    markl.scenario.reload()
    markl.scenario.inject_style(markl.designer.input_el.value);
    var history = markl.scenario.run();
    
    markl.renderer.play(history);
  }

  this.stop_button_click = function()
  {
  }

  this.hide_button_click = function()
  {
    console.log("!")
  }
}