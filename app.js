var t0 = performance.now();
var modules = [
 // add the module name here after you create it in the filesystem. it must match the folder name in app/modules
];
var _ = require('underscore');
require('backbone');

window.Lucy = {};
const Config = require('./modules/Config/Config').default;


for (var i = 0; i < modules.length; i++) {
	// attach all modules to Lucy namespace
	window.Lucy[modules[i]] = require('./modules/'+modules[i]+'/'+modules[i]);

	// Load configuration classes for all modules
	window.Lucy[modules[i]].Config = new Config(modules[i]);
	window.Lucy[modules[i]].Config.Events= {};_.extend(window.Lucy[modules[i]].Config.Events, Backbone.Events);

	// initialize/sync configuration for all modules
	var defaults = require('./modules/'+modules[i]+'/config.js');
	window.Lucy[modules[i]].Config.init(defaults);

	// enable events for all modules and attach all event handlers and event listeners
  window.Lucy[modules[i]].Events = {};_.extend(window.Lucy[modules[i]].Events, Backbone.Events);
  try {
  		require('./modules/'+modules[i]+'/'+'EventHandlers');
    	require('./modules/'+modules[i]+'/'+'EventListeners');
  } catch (e) {}
  if(window.Lucy[modules[i]].hasOwnProperty('init')) {
  	console.log('init for ' + modules[i])
  	window.Lucy[modules[i]].init();
  }
}


window.Lucy = Lucy;
var t1 = performance.now();
console.log("app init took " + (t1 - t0) + " milliseconds.");
window.say = function say (e) { console.log(e); } ;
module.exports = window.Lucy; 