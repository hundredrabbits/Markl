const blessed = require('blessed');

module.exports = {

  index:0,
  history: null,
  screen: blessed.screen(),
  body: blessed.box({top: 0,left: 0,height: '100%',width: '100%',keys: true,mouse: true,alwaysScroll: true,scrollable: true,style: {bg: '#f0f',fg: '#00f'},scrollbar: {ch: '+',bg: '#999'}}),
  turn_el: blessed.box({top: 1,left: 3,height: 1,width: 9,style: {bg: '#000',fg: '#fff'}}),

  install: function(){

    this.screen.append(this.body);
    this.body.append(this.turn_el);
    // Close the example on Escape, Q, or Ctrl+C
    this.screen.key(['escape', 'q', 'C-c'], (ch, key) => (process.exit(0)));
    this.screen.key(['left'], (ch, key) => (this.backward()));
    this.screen.key(['right'], (ch, key) => (this.forward()));

    this.draw();
  },

  forward: function(){
    this.index += 1;
    this.draw();
  },

  backward: function(){
    this.index -= 1;
    this.draw();
  },

  render: function(history){
    this.install();
    this.history = history;
  },

  draw: function(){
    this.turn_el.setContent(` TURN ${this.index}`);
    this.screen.render();
  }
}