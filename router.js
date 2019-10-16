function route(handler, pathname) {
    console.log("About to route a request for " + pathname);
    if (typeof handler[pathname] === 'function') {
        handler[pathname]();
    } else {
        console.log("No request handler found for " + pathname);
    }
}

exports.route = route;