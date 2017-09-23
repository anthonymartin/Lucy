# lucy
a frontend javascript framework


# About
Lucy was written as a response to the Ultidash chrome extensions codebase which had been growing wild with highly coupled spaghetti code. The idea was to use this modular and portable framework to rewrite parts of the code base within Lucy's modularized architecture.


# Features:
1. Modular
2. Lightweight
3. Automatic inclusion of events for each module to handle and listen to events from other modules.
4. Configuration available to each module using indexeddb
5. Write configuration in each module as a simple javascript object
6. Configuration cascading (set defaults and allow overrides)
7. Customizable runtime initialization of modules
8. ES6 / ES2015 support

# Prerequisites:

NPM and webpack must be installed

# Installation:

1. Clone from github
2. Run `npm install`

# Overview:
Lucy works with modules. A module consists of folders inside the Modules directory, each of which correspond to the name of the module. To enable a module, just create the directory and include the name in the modules array in app.js. Congrats, you've added a module!

When a new module is created, that new module is automatically assigned to the `window.Lucy` object. 

All modules have an event system attached to them. For example:

```javascript
Lucy.User.Events.on('login', function() {
  // Do something when user logs in
})
```

or


```javascript
Lucy.Dashboard.Events.listenTo(Lucy.User.Events, 'login', function() {
  // do something on the dashboard when user logs in
})
```

ALl modules have their configuration accessible and automatically saved to indexeddb (graceful degredation to localstorage).

```javascript
Lucy.User.Config.setItem('name', 'Lucy');
```

# Modules:
The files in each module typically consist of

```
- Modules
  - ModuleName
    - config.js
    - EventListeners.js
    - EventHandlers.js
    - DomEventHandlers.js
    - ModuleName.js
```

# Module configuration
The config.js for any given module looks like this:

```javascript
module.exports = {
  your_config_setting: 'value',
  foo: 'bar'
}
```
These values can be accessed from anywhere on the webpage:
```javascript
Lucy.ModuleName.Config.getItem('foo', function(val) {
  // do something with val
});
```
All configuration values are persisted automatically to indexeddb or localstorage if indexeddb is not supported.

# Module Init
Lucy will automatically run ModuleName.init() on runtime. Include this function in your module for it to be executed at runtime.

# Example User Module:

Modules/User/User.js
```javascript
module.exports = {
  init: function() {
    this.Config.getItem('auth_token', function(token) {
      if(token) {
        Lucy.User.setAuthToken(token);
        Lucy.User.login({method:'token'});
      }
    });
  },
  logout: function() {
    Lucy.Auth.Events.trigger('auth/logout');
  },
  login: function(options) {
    // options = { method, name, password }
    Lucy.Auth.Events.trigger('auth/login', options);
  }
  getEmail: function(successCallback) {
    Lucy.User.Config.getItem('email').then(successCallback);
  },
}
```

# Deploying:
1. Compile with webpack: run `npm run build`
2. Your compiled javascript will located in dist/bundle.js

# Todo:
1. Dependency Injection
2. UI component integration (react?)

