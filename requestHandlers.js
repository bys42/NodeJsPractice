var exec = require("child_process").exec;
var querystring = require("querystring");

function defaultHandler(request, response) {
    console.log("Default request handler was called.");

    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World");
    response.end();
}

function fileList(request, response) {
    console.log("Request handler 'fileList' was called.");

    exec("dir /b", function (error, stdout, stderr) {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("-- File List --\n");
        response.write(stdout);
        response.end();
    });
}

function start(request, response) {
    console.log("Request handler 'start' was called.");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" method="post">' +
        '<textarea name="text" rows="20" cols="60">' +
        '</textarea>' +
        '<input type="submit" value="Submit text" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();
}

function upload(request, response) {
    var postData = "";
    console.log("Request handler 'upload' was called.");

    request.setEncoding("utf8");

    request.addListener("data", function (postDataChunk) {
        console.log("Received POST data chunk, length:" + postDataChunk.length);
        postData += postDataChunk;
    });

    request.addListener("end", function () {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("You've sent:\n" + querystring.parse(postData).text);
        response.end();
    });
}

function notFound(request, response) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write("404 Not found");
    response.end();
}

exports.handlerList = {
    "/": defaultHandler,
    "/filelist": fileList,
    "/start": start,
    "/upload": upload,
    "/notFound": notFound
}