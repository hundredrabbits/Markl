'use strict';

const blessed = require('blessed');

module.exports = {

  index:0,
  history: null,
  screen: blessed.screen(),
  body: blessed.box({top: 0,left: 0,height: '100%',width: '100%',keys: true,mouse: true,alwaysScroll: true,scrollable: true,style: {bg: '#000',fg: '#00f'},scrollbar: {ch: '+',bg: '#999'}}),
  arena_el: blessed.box({top: 1,left: 3,height: 7,width: 7, border:{type: 'line',fg:'#fff', bg:'#000'} ,style: {bg: '#000',fg: '#000'}}),

  timeline_el: blessed.box({top: 1,left: 13,height: 1,width: 100 ,style: {bg: '#000',fg: '#fff'}}),
  turn_el: blessed.box({top: 3,left: 13,height: 1,width: 20,style: {bg: '#000',fg: '#fff'}}),
  reaction_el: blessed.box({top: 5,left: 13,height: 4,width: 35 ,style: {bg: '#000',fg: '#fff'}}),
  action_el: blessed.box({top: 5,left: 40,height: 4,width: 35 ,style: {bg: '#000',fg: '#fff'}}),
  status_el: blessed.box({top: 5,left: 60,height: 4,width: 35 ,style: {bg: '#000',fg: '#fff'}}),
  player_el: blessed.box({top: 10,left: 13,height: 1,width: 35 ,style: {bg: '#000',fg: '#fff'}}),
  style_el: blessed.box({top: 11,left: 13,height: 40,width: 35 ,style: {bg: '#000',fg: '#fff'}}),
  marker_el: blessed.box({top: 0,left: 0,height: 1,width: 1 ,content:'>',style: {bg:'#000',fg: '#72dec2'}}),

  events_el: blessed.box({top: 10,left: 40,height: 4,width: 30 ,content:'>',style: {bg:'#000',fg: '#fff'}}),
  
  players_el: [
    blessed.box({top: 0,left: 0,height: 1,width: 1, content:'1' ,style: {bg: '#000',fg: '#fff'}}),
    blessed.box({top: 0,left: 2,height: 1,width: 1, content:'2' ,style: {bg: '#000',fg: '#fff'}}),
    blessed.box({top: 2,left: 2,height: 1,width: 1, content:'3' ,style: {bg: '#000',fg: '#fff'}}),
    blessed.box({top: 2,left: 2,height: 1,width: 1, content:'4' ,style: {bg: '#000',fg: '#fff'}})
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
    this.body.append(this.timeline_el);
    this.body.append(this.events_el);
    this.style_el.append(this.marker_el);

    for(let id in this.history[this.index].state.players){
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

  // Events
  
  events_ui: [],

  remove_events_ui: function(){
    for(let id in this.events_ui){
      let el = this.events_ui[id];
      el.destroy();
    }
  },

  draw_events(turn){
    this.remove_events_ui();
    let s = ""
    for(i in turn.state.events){
      let event = turn.state.events[i];
      let event_ui = blessed.box({left: event.pos.x,top: event.pos.y,height:1,width:1,content:"+",style: {bg: '#fff',fg: '#000'}});
      event_ui.setContent("+")
      this.arena_el.append(event_ui);
      this.events_ui.push(event_ui);
      s += `${event.name}(${event.pos.x},${event.pos.y} : ${event.vector.x},${event.vector.y})\n`;
    }
    this.events_el.setContent(s ? s : "NO EVENTS")
  },
  
  draw_timeline(){
    let s = ""
    for(let id in this.history){
      let turn = this.history[id];
      if(this.index > id){ s += ">"; continue; }
      if(turn.action.name && (turn.action.name.substr(0,1) == "M" || turn.action.name.substr(0,1) == "W")){ s += "-"; continue; }
      s += turn.action.name ? turn.action.name.substr(0,1) : "-";
    }
    this.timeline_el.setContent(s)
  },

  draw: function(){

    let turn = this.history[this.index];

    this.turn_el.setContent(`TURN ${this.index}/${this.history.length-1}`);

    this.draw_timeline();
    this.draw_events(turn);

    let reaction = turn.reaction;
    this.reaction_el.setContent(`TRIG ${reaction.trigger}\nEVNT ${reaction.event}\nCOND ${reaction.condition}\nTARG ${reaction.target ? reaction.target.name : ''}`);

    let action = turn.action;
    this.action_el.setContent(`NAME ${action.name}\nATTR ${action.attr}\nLINE ${action.line}`);

    let playing = turn.player;
    this.style_el.setContent(playing.style);
    this.player_el.setContent(playing.name+" "+turn.state.events.length);

    this.marker_el.top = parseInt(action.line);

    let status_html = "";

    for(let id in turn.state.players){
      let player = turn.state.players[id];

      status_html += `${player.name} ${player.hp}HP ${player.sp}SP ${player.score.hits+player.score.blocks}AP <${player.status}>\n`

      this.players_el[id].left = player.pos.x;
      this.players_el[id].top = player.pos.y;

      this.players_el[id].style.fg = "#fff"
      this.players_el[id].style.bg = "#000"

      if(playing.name == player.name){
        this.players_el[id].style.bg = "#333";
      }

      if(player.status == "hit"){
        this.players_el[id].style.bg = "red"
        this.players_el[id].style.fg = "#fff"
      }
      else if(player.status == "dead"){
        this.players_el[id].style.bg = "#000"
        this.players_el[id].style.fg = "grey"
      }
      else if(player.status == "confused"){
        this.players_el[id].style.bg = "cyan"
        this.players_el[id].style.fg = "white"
      }
      else if(player.status == "stasis"){
        this.players_el[id].style.bg = "#fff"
        this.players_el[id].style.fg = "blue"
      }
      else if(player.status == "blocking"){
        this.players_el[id].style.bg = "yellow"
        this.players_el[id].style.fg = "black"
      }
      else if(player.status == "attacking"){
        this.players_el[id].style.bg = "#000"
        this.players_el[id].style.fg = "#72dec2"
      }
    }

    this.status_el.setContent(status_html);

    this.screen.render();
  }
}