"use strict";

let Style = require('./style.js')

let actions = {
   MOVE: require('./actions/move.js'),
   DASH: require('./actions/dash.js'),
   ATTACK: require('./actions/attack.js'),
   PUSH: require('./actions/push.js'),
   WAIT: require('./actions/wait.js'),
   IDLE: require('./actions/idle.js'),
   FIRE: require('./actions/fire.js'),
};

function Supervisor()
{
  this.initial_state =  null;
  this.history = [];

  this.run = function(state)
  {
    let player = this.next_player(state);
    this.play(player,state);
    state.turn += 1;
  }

  this.play = function(player,state)
  {
    let reaction = new Style(player).run(state)
    this.act(player,reaction,state);
  }

  this.act = function(player,reaction,state)
  {
    // Run Stage Events
    this.stage(state);

    // Check if player should continue
    if(reaction && player.reaction && reaction.trigger == player.reaction.trigger && reaction.event == player.reaction.event && reaction.condition == player.reaction.condition){
      player.tp += 1; 
    }
    else{
      player.tp = 0
    }
    player.reaction = reaction

    // Run Player Action
    let action = reaction.actions[player.tp % reaction.actions.length];
    if(action){
      let name = action.split(" ")[0].trim();
      let attr = action.replace(name,"").trim()
      let a = actions[name] ? new actions[name](player,attr) : new actions.IDLE(player,attr);
      a.run(state,reaction.target);  
    }
    this.record(state,player,reaction,action);
  }

  this.stage = function(state)
  {
    let a = []
    for(let id in state.events){
      let event = state.events[id];
      event.run(state);
      if(event.life >= 0){ a.push(event); } // Remove dead events
    }
    state.events = a;
  }

  this.record = function(state,player = {},reaction = {},action = {})
  {
    this.history.push({state:copy(state),player:copy(player),reaction:copy(reaction),action:copy(action)});
  }

  this.clean = function(state)
  {
    state.effects = [];
    for(let id in state.players){
      let player = state.players[id];
      if(player.status == "kill"){
        player.status = "dead";
      }
      player.status = player.status == "stasis" || player.status == "dead" ? player.status : "idle";
    }
  }

  this.end = function(state)
  {
    this.clean(state);
    let player = this.next_player(state);

    this.record(state,player);
  }

  this.next_player = function(state)
  {
    let players = this.players_alive(state);
    let p = players[0];
    for(let id in players){
      let player = players[id];
      p = player.sp > p.sp ? player : p;
    }
    return p;
  }

  this.players_alive = function(state)
  {
    let p = [];
    for(let id in state.players){
      let player = state.players[id];
      if(player.hp > 0){ p.push(player); }
    }
    return p;
  }

  this.has_winner = function(state)
  {
    return this.players_alive(state).length < 2;
  }

  this.render = function(state)
  {
    console.log("Rendering..")
    this.history = [];
    this.initial_state = state;

    let max_turns = 100;
    let i = 0;
    while(i < max_turns){
      if(this.has_winner(state)){
        this.end(state);
        break;
      }
      this.clean(state);
      this.run(state);
      i += 1;
    }
    console.log(`Completed in ${this.history.length} steps`)

    return this.history;
  }

  function copy(o){ return JSON.parse(JSON.stringify(o)); }
}

module.exports = new Supervisor();

