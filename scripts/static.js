let arenas = {};

arenas.tutorial = new Arena("Training",new Size(5,5),[
  new Spawn(new Pos(0,0)),
  new Spawn(new Pos(4,4)),
  new Spawn(new Pos(4,0)),
  new Spawn(new Pos(0,4)),
  new Hole(new Pos(2,2),1)
]);

arenas.duel = new Arena("Duel",new Size(3,5),[
  new Spawn(new Pos(1,1)),
  new Spawn(new Pos(1,4))
])

arenas.temple = new Arena("Temple",new Size(3,5),[
  new Spawn(new Pos(1,1)),
  new Spawn(new Pos(1,4))
])

let menu_test = `MENU
  CHARACTER
    NAME IS LANCER
      SELECT
  LOADOUT
    SPELL IS ARROW
      SELECT
  ARENA
    NAME IS TRAINING
      SELECT
      
OPTION
  AUDIO
    NAME IS SFX
       SET 0

SIGHT
  FIGHTER
    DISTANCE IS 3
      MOVE AWAY
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE TOWARD
  OBJECT
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE
  PROJECTILE
    DEFAULT
      STEP
`;


let custom_style = `-- wimp.fight

SIGHT
  FIGHTER
    DISTANCE IS 4
      MOVE AWAY
    DISTANCE IS 1
      ATTACK TOWARD
    DEFAULT
      MOVE TOWARD
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
      MOVE ANY

MENU
  OPTION
    NAME IS AUDIO
      SET OFF
  CHARACTER
    NAME IS PATIENCE
      SELECT
  LOADOUT
    NAME IS TELEKINETIC
      SELECT

`;

let idle_style = `-- idle.fight

DEFAULT
  DEFAULT
    DEFAULT
      WAIT
`;

let other_style = `-- dodge.fight

SIGHT
  FIGHTER
    DISTANCE IS 2
      MOVE AWAY
    DISTANCE IS 1
      ATTACK TOWARD
  OBJECT
    DEFAULT
      MOVE
  PROJECTILE
    DEFAULT
      MOVE AWAY
`;
