'use strict';

function Supervisor(fightscript,character,stage)
{
  const history = [];

  // Helpers

  function find_alive(stage)
  {
    const p = [];
    for(const id in stage.fighters){
      if(stage.fighters[id].hp > 0){ p.push(stage.fighters[id]); }
    }
    return p;
  }

  function find_next(stage)
  {
    const fighters = find_alive(stage);
    return fighters.sort((a, b) => {
      return a.stamina - b.stamina;
    }).reverse();
  }

  // Turns

  function play(stage)
  {
    const fighter = find_next(stage)[0];
    console.log(`Play Turn: ${fighter.name}`)

    // Find reaction of fighter style against stage
    const triggers = stage.triggers(fighter);
    const reaction = fighter.fightscript.react(triggers);

    // TODO: 
    
    record(stage);
  }

  function record(stage)
  {
    history.push(stage.serialize())
  }

  function render(f,c,s)
  {
    const stage = new s([c],[f])
    record(stage);

    for(let i = 0; i < 2; i++){
      play(stage);
    }

    return history
  }

  return render(fightscript,character,stage)
}

module.exports = Supervisor;