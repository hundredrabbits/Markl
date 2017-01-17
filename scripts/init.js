
var TILE_SIZE = new Size(50,50);

// Responses

var WAIT = new Move(new Pos(0,0));
var MOVE_UP = new Move(new Pos(0,1));
var MOVE_DOWN = new Move(new Pos(0,-1));
var MOVE_LEFT = new Move(new Pos(0,-1));
var MOVE_RIGHT = new Move(new Pos(0,-1));
var ATTACK_UP = new Move(new Pos(0,-1));
var ATTACK_DOWN = new Move(new Pos(0,-1));
var ATTACK_LEFT = new Move(new Pos(0,-1));
var ATTACK_RIGHT = new Move(new Pos(0,-1));

markle = new Markle(document.getElementById('markle'));
markle.install();

// Arena
var test_arena = new Arena("Debug",new Size(5,5));
test_arena.add_event(new Spawn(new Pos(0,0)));
test_arena.add_event(new Spawn(new Pos(4,0)));
test_arena.add_event(new Spawn(new Pos(4,4)));
test_arena.add_event(new Spawn(new Pos(0,4)));
test_arena.add_event(new Block(new Pos(1,1)));
test_arena.add_event(new Block(new Pos(3,1)));
test_arena.add_event(new Block(new Pos(1,3)));
test_arena.add_event(new Block(new Pos(3,3)));
markle.set_arena(test_arena);

// Players
markle.add_player(new Sage("Borges",new Custom()));
markle.add_player(new Patience("Calvino",new Idle()));
markle.add_player(new Patience("Barjavel",new Idle()));
markle.add_player(new Patience("Kafka",new Idle()));

markle.ready();