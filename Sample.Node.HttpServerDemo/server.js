var http = require('http');
var url = require('url');

function start(route) {
    function onRequest(request, response) {
        
        var pathname = url.parse(request.url).pathname;
        
        console.info("Request for " + pathname + "received.");
        
        route(pathname);
        
        response.writeHead(200, { "Content-Type": "text/plan" });
        response.write("hello World");
        response.end();
    }
    
    http.createServer(onRequest).listen(3000, function () {
        console.info('server runing on 3000 port!');
    });
}

exports.start = start;