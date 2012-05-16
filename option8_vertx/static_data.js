load('vertx.js');

var eb = vertx.eventBus;

var pa = 'vertx.mongopersistor';

var todos = [
  {
    done: false,
    text: 'todo1',
    order: 1
  },
  {
    done: false,
    text: 'todo2',
    order: 2
  }
];

var myHandler = function(message) {
    vertx.logger.info('I received a message: ' + JSON.stringify(message));
    //eb.send('todos', {text: 'I got a message!'});
};

eb.registerHandler(pa, myHandler);

// First delete everything

eb.send(pa, {action: 'delete', collection: 'todos', matcher: {}});

// Insert albums - in real life price would probably be stored in a different collection, but, hey, this is a demo.

for (var i = 0; i < todos.length; i++) {
  eb.send(pa, {
    action: 'save',
    collection: 'todos',
    document: todos[i]
  });
}

/**
eb.registerHandler('todos.broadcast.events', function(message){
    vertx.logger.info('I am Todos. I received a message ' + message.todo);
});
**/