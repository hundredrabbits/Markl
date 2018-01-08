var Style = require('./style.js')

var actions = {
   MOVE: require('./actions/move.js'),
   DASH: require('./actions/dash.js'),
   ATTACK: require('./actions/attack.js'),
   WAIT: require('./actions/wait.js'),
};

module.exports = {

  initial_state: null,
  history:[],
  turn:0,

  run: function(state){
    console.log(`TURN ${this.turn}`)
    var player = this.next_player(state);
    this.play(player,state);
    this.turn += 1;
  },

  play: function(player,state){
    console.log(`PLAY ${player.name} #${player.id}`)
    let reaction = new Style(player).run(state)
    this.act(player,reaction,state);
  },

  act: function(player,reaction,state){
    var action = reaction.actions[0];
    var a = new actions[action.name](player,action.attr,reaction.target);
    console.log(`ACT  ${action.name}`)
    a.run(state);
    this.record(state,player,reaction,action);
  },

  record: function(state,player = {},reaction = {},action = {}){
    this.history.push({state:this.copy(state),player:this.copy(player),reaction:this.copy(reaction),action:this.copy(action)});
  },

  copy: function(obj){
    return JSON.parse(JSON.stringify(obj));
  },

  next_player: function(state){
    let players = this.players_alive(state);
    let p = players[0];
    for(id in players){
      var player = players[id];
      p = player.sp > p.sp ? player : p;
    }
    return p;
  },

  players_alive: function(state){
    let p = [];
    for(id in state.players){
      var player = state.players[id];
      if(player.hp > 0){ p.push(player); }
    }
    return p;
  },

  has_winner: function(state){
    return this.players_alive(state).length < 2;
  },

  render:function(state){
    this.initial_state = state;
    this.record(state);

    var max_turns = 100;
    var i = 0;
    while(i < max_turns){
      if(this.has_winner(state)){
        break;
      }
      this.run(state);
      i += 1;
    }

    return this.history;
  }
}