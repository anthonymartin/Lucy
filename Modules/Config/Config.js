'use strict';
var _ = require('underscore');
import StorageInterface from './StorageInterface';

export default class Config {
	// if config for module doesn't exist, set this.db as localforage and return this object
	// otherwise, set defaults from module config.js
	constructor(moduleName) {

		this.moduleName ='';
		this.StorageInterface = {};
		this.defaults = {};
		this.defaultKeys = [];

		if (typeof moduleName === 'undefined') {
			throw 'Framework/Config - must provide modulename';
		}
		this.moduleName = moduleName;
		this.StorageInterface = new StorageInterface({
	  	name: moduleName
		});


	}
	// retrieve all config keys from storageinterface
	// if key from defaults object doesn't exist in localforage, save default config value from config.js
	init(defaults) {

		// set default keys
		this.defaults = defaults;
		var context = this;
		Object.keys(this.defaults).forEach(function(key,index) {
			context.defaultKeys.push(key);
		});

		// if any default key does not exist in database, save it, otherwise, ignore
		var moduleName = this.moduleName;
		var defaultKeys = this.defaultKeys;
		var defaults = this.defaults;

		this.StorageInterface.keys().then(function(storedKeys) {
			var keysToSave = _.difference(defaultKeys, storedKeys);
			keysToSave.forEach(function(key, index){
				UD[moduleName].Config.setItem(key, UD[moduleName].Config.defaults[key]);
			});
		}).catch(function(err) {
		    // This code runs if there were any errors
		    console.log(err);
		});
	}
	setItem(key, value, successCallback) {
		this.Events.trigger('setItem', {key: key, value: value});
		return this.StorageInterface.setItem(key, value, successCallback);
	}
	getItem(key, successCallback) {
		return this.StorageInterface.getItem(key, successCallback);
	}
	keys(successCallback) {
		return this.StorageInterface.keys(successCallback);
	}
	key(keyIndex, successCallback) {
		return this.StorageInterface.key(keyIndex, successCallback);
	}
	removeItem(key, successCallback) {
		return this.StorageInterface.key(key, successCallback);
	}
	length(successCallback) {
		return this.StorageInterface.length(successCallback);
	}
	clear(successCallback) {
		return this.StorageInterface.clear(successCallback);
	}
}

