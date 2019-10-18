function route(handler, pathname, request, response) {
    if (typeof handler[pathname] === 'function') {
        console.log("About to route a request for " + pathname);
        handler[pathname](request, response);
    } else {
        console.log("No request handler found for " + pathname);
        handler["/notFound"](request, response);
    }
}

exports.route = route;