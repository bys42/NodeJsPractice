function defaultHandler() {
    console.log("Default request handler was called.");
}

function start() {
    console.log("Request handler 'start' was called.");
}

function upload() {
    console.log("Request handler 'upload' was called.");
}

exports.default = defaultHandler;
exports.start = start;
exports.upload = upload;