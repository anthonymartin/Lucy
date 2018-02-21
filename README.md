# Lucy
a javascript framework designed by Anthony Martin


# About
Lucy was created for people who like to craft modular and portable javascript. It speeds up development time by providing features for common tasks such as saving user configuration preferences to indexeddb (or localstorage if indexedDB is not supported). Lucy also exposes an event system for implementing event driven architectures in an application. It can work and co-exist with with any other javascript framework or library like React or Angular.

# Features:
1. Modular
2. Lightweight
3. Automatic inclusion of events for each module to handle and listen to events from other modules.
4. Module's configuration settings saved to indexeddb on runtime
5. Define module's configuration as a simple javascript object
6. Configuration cascading (set defaults and allow overrides)
7. Customizable runtime initialization of modules
8. ES6 / ES2015 support

# Prerequisites:

NPM and webpack must be installed

# Installation:

1. Clone from github
2. Run `npm install`

# Overview:
Lucy's basic building block is a module. Each module is a directory inside the Modules directory. The directory name of the module corresponds to the name of the module. Lucy uses CamelCase module names as a convention. To enable a module, just create the directory and include the module name in the modules array in app.js. Congrats, you've added a module!

When a new module is created, that new module is automatically assigned to the `window.Lucy` object. 

All modules have access to a namespaced event system. For example:

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

A module's configuration settings defined in the module's `config.js` is automatically saved to indexeddb with graceful degredation to localstorage.

```javascript
Lucy.User.Config.setItem('name', 'Lucy');
```

# Modules:
Example modules directory structure. A file named after the module name is the only required file. All other files shown are optional.
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
The `config.js` file for any given module looks like this:

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
All configuration values are persisted automatically to indexeddb (or localstorage if indexeddb is not supported).

# Module Init
Lucy will automatically run a module's `init()` function on runtime. Include this function in your module for it to be executed at runtime. Consider it like a constructor or your modules bootstrap method.

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
1. Refactor app.js to require a bootstrap.js file which will subsequently run a kernel.
2. Synchronize client configuration with a server by creating a BackendProvider module.
3. Create a command line tool to which creates a new module's directory structure. 
4. Set a module option to export its namespace to the window object. This will allow one to invoke module functions by name instead of prepending them with Lucy
5. Dependency Injection
6. Allow choice of indexeddb vs localstorage. indexeddb uses async callbacks for accessing configuration values
7. UI component integration (react?)
