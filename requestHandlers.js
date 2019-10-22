var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

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

function sendText(request, response) {
    console.log("Request handler 'start' was called.");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/showText" method="post">' +
        '<textarea name="text" rows="1" cols="60">' +
        '</textarea>' +
        '<input type="submit" value="Submit text" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();
}

function showText(request, response) {
    var postData = "";
    console.log("Request handler 'showText' was called.");

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

function uploadImage(request, response) {
    console.log("Request handler 'uploadImage' was called.");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/showImage" method="post" enctype="multipart/form-data" >' +
        '<input type="text" name="title" placeholder="title"> <br>' +
        '<input type="file" name="image"> <br>' +
        '<input type="submit" value="upload file">' +
        '</form>' +
        '</body>' +
        '</html>';
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();
}

function showImage(request, response) {
    console.log("Request handler 'showImage' was called.");

    var form = new formidable.IncomingForm();
    form.uploadDir = "./image";
    form.keepExtensions = true;
    form.parse(request, function (error, fields, files) {
        var util = require('util');
        util.inspect({fields: fields, files: files});

        var inStream = fs.createReadStream(files.image.path);
        var outStream = fs.createWriteStream("./image/test.png");

        inStream.pipe(outStream);
        inStream.on('end', function () {
            fs.unlinkSync(files.image.path);
        });

        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("received image <br/>" + fields.title + "<br/>");
        response.write("<img src='/image' />");
        response.end();
    });
}

function image(request, response) {
    console.log("Request handler 'image' was called.");
    fs.readFile("./image/test.png", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(error + "\n");
        } else {
            response.writeHead(200, { "Content-Type": "image/png" });
            response.write(file, "binary");
        }
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
    "/sendText": sendText,
    "/showText": showText,
    "/uploadImage": uploadImage,
    "/showImage": showImage,
    "/image": image,
    "/notFound": notFound
}