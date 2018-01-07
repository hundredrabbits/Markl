module.exports = {

  initial_state: null,
  history:[],
  turn:0,

  run: function(state){
    var player = this.next_player(state);
    console.log(`Running:${this.turn} -> ${player.name}#${player.id}`)
    this.turn += 1;
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
    this.run(state);

    return this.history;
  }
}