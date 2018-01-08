let player1 = {
  id:0,
  hp:5,
  sp:0,
  name:"USER",
  type:"FIGHTER",
  character: "Pest",
  status:"default",
  pos:{
    x:0,
    y:0
  },
  style: `
SIGHT
  FIGHTER
    DISTANCE IS 4
      DASH TOWARD
    DISTANCE IS 2
      MOVE AWAY
    DISTANCE IS 1
      ATTACK AWAY
    DEFAULT
      MOVE AWAY
  OBJECT
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE
  PROJECTILE
    DEFAULT
      STEP
DEFAULT
  DEFAULT
    DEFAULT
      MOVE ANY`
}

let player2 = {
  id:1,
  hp:5,
  sp:0,
  name:"CPU1",
  type:"FIGHTER",
  character: "Sin",
  status:"default",
  pos:{
    x:0,
    y:4
  },
  style: `
SIGHT
  FIGHTER
    DISTANCE IS 4
      WAIT
    DISTANCE IS 2
      MOVE TOWARD
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE AWAY
  OBJECT
    DISTANCE IS 1
      ATTACK TOWARD
  PROJECTILE
    DEFAULT
      STEP
DEFAULT
  DEFAULT
    DEFAULT
      MOVE ANY`
}

let player3 = {
  id:1,
  hp:5,
  sp:0,
  name:"CPU2",
  type:"FIGHTER",
  character: "Sin",
  status:"default",
  pos:{
    x:4,
    y:4
  },
  style: `
SIGHT
  FIGHTER
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE TOWARD
DEFAULT
  DEFAULT
    DEFAULT
      MOVE ANY`
}

let player4 = {
  id:1,
  hp:5,
  sp:0,
  name:"CPU3",
  type:"FIGHTER",
  character: "Sin",
  status:"default",
  pos:{
    x:4,
    y:0
  },
  style: `
SIGHT
  FIGHTER
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE TOWARD
DEFAULT
  DEFAULT
    DEFAULT
      MOVE ANY`
}


player1.score = {hits:0,blocks:0}
player2.score = {hits:0,blocks:0}
player3.score = {hits:0,blocks:0}
player4.score = {hits:0,blocks:0}

module.exports = {
  players : [player1,player2,player3,player4]
}