var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

server.start(requestHandlers.handlerList, router.route);