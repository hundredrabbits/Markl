
const state       = require('./server/state.js')
const supervisor  = require('./server/supervisor')
const renderer    = require('./server/renderer.js')

var result = supervisor.render(state);
var render = renderer.render(result);