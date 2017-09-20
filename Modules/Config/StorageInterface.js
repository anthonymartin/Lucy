'use strict';

import localforage from 'localforage';

export default class StorageInterface {

	constructor(options) {
		this.moduleName = options.name;
		if (typeof options.name === 'undefined') {
			throw 'Framework/Config - must provide name';
		}
		this.storageProvider = localforage.createInstance({
	  	name: options.name
		});
		this.storageProvider.config();
	}
	setItem(key, value, successCallback) {
		return this.storageProvider.setItem(key, value);
	}
	getItem(key, successCallback) {
		return this.storageProvider.getItem(key, successCallback);
	}
	keys(successCallback) {
		return this.storageProvider.keys(function(keys) {
			if (typeof successCallback == 'function') {
				return successCallback(keys);
			}
		});
	}
	key(keyIndex, successCallback) {
		return this.storageProvider.key(keyIndex, successCallback);
	}
	removeItem(key, successCallback) {
		return this.storageProvider.key(key, successCallback);
	}
	length(successCallback) {
		return this.storageProvider.length(successCallback);
	}
	clear(successCallback) {
		return this.storageProvider.clear(successCallback);
	}
}