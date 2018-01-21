
const scenario_name = process.argv[2] ? process.argv[2] : "garden";
const scenario = require('./server/scenario');
const renderer = require('./server/renderer.js')

scenario.load(scenario_name);
scenario.run();

var render = renderer.render(scenario.history);
