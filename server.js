var http = require("http");
var url = require("url");

function start(handler, route) {
  
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    
    route(handler, pathname, request, response);
  }

  http.createServer(onRequest).listen(8888);

  console.log("hello server");
}

exports.start = start;
