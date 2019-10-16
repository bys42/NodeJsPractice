var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handler = {}
handler["/"] = requestHandlers.default;
handler["/start"] = requestHandlers.start;
handler["/upload"] = requestHandlers.upload;

server.start(handler, router.route);