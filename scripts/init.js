
markle = new Markle(document.getElementById('markle'));
markle.install();

var test_arena = new Arena("Debug",new Size(5,5));

markle.set_arena(test_arena);
markle.set_player(new Player("Borges"));
markle.set_player(new Player("Calvino"));
markle.set_player(new Player("Barjavel"));
markle.set_player(new Player("Kafka"));

markle.start();