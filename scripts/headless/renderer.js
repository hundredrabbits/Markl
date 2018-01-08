const blessed = require('blessed');

module.exports = {

  index:0,
  history: null,
  screen: blessed.screen(),
  body: blessed.box({top: 0,left: 0,height: '100%',width: '100%',keys: true,mouse: true,alwaysScroll: true,scrollable: true,style: {bg: '#f0f',fg: '#00f'},scrollbar: {ch: '+',bg: '#999'}}),
  arena_el: blessed.box({top: 1,left: 3,height: 7,width: 7, border:{type: 'line',fg:'#fff', bg:'#000'} ,style: {bg: '#000',fg: '#000'}}),

  turn_el: blessed.box({top: 2,left: 13,height: 1,width: 20,style: {bg: '#000',fg: '#fff'}}),
  reaction_el: blessed.box({top: 4,left: 13,height: 4,width: 35 ,style: {bg: '#000',fg: '#fff'}}),
  action_el: blessed.box({top: 4,left: 40,height: 4,width: 35 ,style: {bg: '#000',fg: '#fff'}}),
  status_el: blessed.box({top: 9,left: 13,height: 4,width: 35 ,style: {bg: '#000',fg: '#fff'}}),
  player_el: blessed.box({top: 14,left: 13,height: 1,width: 35 ,style: {bg: '#000',fg: '#fff'}}),
  style_el: blessed.box({top: 15,left: 13,height: 40,width: 35 ,style: {bg: '#000',fg: '#fff'}}),
  marker_el: blessed.box({top: 0,left: 0,height: 1,width: 1 ,content:'>',style: {bg:'#000',fg: '#72dec2'}}),
  
  players_el: [
    blessed.box({top: 0,left: 0,height: 1,width: 1, content:'1' ,style: {bg: '#f0f',fg: '#fff'}}),
    blessed.box({top: 0,left: 2,height: 1,width: 1, content:'2' ,style: {bg: '#f0f',fg: '#fff'}}),
    blessed.box({top: 2,left: 2,height: 1,width: 1, content:'3' ,style: {bg: '#f0f',fg: '#fff'}}),
    blessed.box({top: 2,left: 2,height: 1,width: 1, content:'4' ,style: {bg: '#f0f',fg: '#fff'}})
  ],

  install: function(){

    this.screen.append(this.body);
    this.body.append(this.arena_el);

    this.body.append(this.turn_el);
    this.body.append(this.reaction_el);
    this.body.append(this.action_el);
    this.body.append(this.status_el);
    this.body.append(this.player_el);
    this.body.append(this.style_el);
    this.style_el.append(this.marker_el);

    for(id in this.history[this.index].state.players){
      this.arena_el.append(this.players_el[id]);
    }
    // Close the example on Escape, Q, or Ctrl+C
    this.screen.key(['escape', 'q', 'C-c'], (ch, key) => (process.exit(0)));
    this.screen.key(['left'], (ch, key) => (this.backward()));
    this.screen.key(['right'], (ch, key) => (this.forward()));

    this.draw();
  },

  forward: function(){
    this.index += this.index < this.history.length-1 ? 1 : 0;
    this.draw();
  },

  backward: function(){
    this.index -= this.index > 0 ? 1 : 0;
    this.draw();
  },

  render: function(history){
    this.history = history;
    this.install();
  },

  draw: function(){
    this.turn_el.setContent(`TURN ${this.index}/${this.history.length-1}`);

    var reaction = this.history[this.index].reaction;
    this.reaction_el.setContent(`TRIG ${reaction.trigger}\nEVNT ${reaction.event}\nCOND ${reaction.condition}\nTARG ${reaction.target ? reaction.target.name : ''}`);

    var action = this.history[this.index].action;
    this.action_el.setContent(`NAME ${action.name}\nATTR ${action.attr}\nLINE ${action.line}`);

    var playing = this.history[this.index].player;
    this.style_el.setContent(playing.style);
    this.player_el.setContent(playing.name);

    this.marker_el.top = parseInt(action.line);

    var status_html = "";

    for(id in this.history[this.index].state.players){
      var player = this.history[this.index].state.players[id];

      status_html += `${player.name} ${player.hp}HP ${player.sp}SP ${player.score.hits+player.score.blocks}AP <${player.status}>\n`

      this.players_el[id].left = player.pos.x;
      this.players_el[id].top = player.pos.y;

      this.players_el[id].style.fg = "#fff"
      this.players_el[id].style.bg = "#f0f"

      if(playing.name == player.name){
        this.players_el[id].style.bg = "#333";
      }

      if(player.status == "hit"){
        this.players_el[id].style.bg = "red"
        this.players_el[id].style.fg = "#fff"
      }
      else if(player.status == "dead"){
        this.players_el[id].style.bg = "#f0f"
        this.players_el[id].style.fg = "grey"
      }
      else if(player.status == "statis"){
        this.players_el[id].style.bg = "#fff"
        this.players_el[id].style.fg = "blue"
      }
      else if(player.status == "blocking"){
        this.players_el[id].style.bg = "yellow"
        this.players_el[id].style.fg = "black"
      }
      else if(player.status == "attacking"){
        this.players_el[id].style.bg = "#f0f"
        this.players_el[id].style.fg = "#72dec2"
      }
    }

    this.status_el.setContent(status_html);

    this.screen.render();
  }
}