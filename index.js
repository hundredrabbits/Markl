
const state       = require('./scripts/headless/state.js')
const supervisor  = require('./scripts/headless/supervisor')
const renderer    = require('./scripts/headless/renderer.js')

// console.log(process.argv[2]);

var result = supervisor.render(state);
var render = renderer.render(result);