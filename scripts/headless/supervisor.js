var Style = require('./style.js')

var actions = {
   MOVE: require('./actions/move.js'),
   ATTACK: require('./actions/attack.js'),
   WAIT: require('./actions/wait.js')
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
  },

  next_player: function(state){
    let p = state.players[0];
    for(id in state.players){
      var player = state.players[id];
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

    this.run(state);
    this.run(state);

    return this.history;
  }
}