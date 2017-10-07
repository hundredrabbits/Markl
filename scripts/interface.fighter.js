function Fighter_Interface(host)
{
  this.host = host;

  this.el = document.createElement("yu");

  this.label_el = document.createElement("text");
  this.el.appendChild(this.label_el);
  this.label_el.textContent = this.host.name;
  this.label_el.className = "label";

  this.progress_el = document.createElement("yu");
  this.progress_el.className = "progress";
  this.el.appendChild(this.progress_el);

  this.bar_el = document.createElement("yu");
  this.bar_el.className = "bar";
  this.progress_el.appendChild(this.bar_el);

  // this.label_el.className = this.name.toLowerCase();

  this.update = function()
  {
    $(this.bar_el).animate({ width: ((this.host.hp/3.0) * 80) }, ACT_SPEED/4);
  }
}