
const state       = require('./scripts/server/state.js')
const supervisor  = require('./scripts/server/supervisor')
const renderer    = require('./scripts/server/renderer.js')

var result = supervisor.render(state);
var render = renderer.render(result);