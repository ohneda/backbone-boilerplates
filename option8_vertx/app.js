load('vertx.js');

// Configuration for the web server
var webServerConf = {

  // Normal web server stuff
  port: 8080,
  host: 'localhost',
  ssl: false,

  // Configuration for the event bus client side bridge
  // This bridges messages from the client side to the server side event bus
  bridge: true,

  // This defines which messages from the client we will let through
  // to the server side
  permitted: [
    {
      address : 'vertx.mongopersistor',
      match : {
        action : 'find',
        collection : 'todos'
      }
    },
    {
      address : 'vertx.mongopersistor',
      match : {
        action : 'save',
        collection : 'todos'
      }
    },
    {
      address : 'vertx.mongopersistor',
      match : {
        action : 'delete',
        collection : 'todos'
      }
    },
    {
      address : 'todos.broadcast.event'
    }        
      
  ]
};

vertx.deployVerticle('mongo-persistor', null, 1, function() {
  load('static_data.js');
});

vertx.deployVerticle('web-server', webServerConf);