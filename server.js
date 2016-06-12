var http = require('http');
var fs = require('fs');

var get_extension = function(uri) {
    return uri.substr(uri.lastIndexOf('.')+1);
}

http.createServer(function(request, response) {
    var uri = request.url.substr(1);
    if(uri == "") {
        uri = 'index.js';
    }

    var extension = get_extension(uri);

    if(extension == 'js') {
        fs.readFile(uri, 'utf-8', function(err, data) {
            if(err) {
                response.writeHead(404, {'Content-Type': 'text/html'});
                response.end("");
            }
            else {
                response.writeHead(200, {'Content-Type': 'text/html'});
                console.log('plane:');
                console.log(data);
                var html = eval(data);
                console.log('evaled:');
                console.log(html);
                response.end(html);
            }
        });
    }
    else {
        var content_type = 'image/' + extension;
        fs.readFile(uri, function(err, data) {
            if(err) {
                response.writeHead(404, {'Content-Type': content_type});
                response.end("");
            }
            else {
                response.writeHead(200, {'Content-Type': content_type});
                response.end(data);
            }
        });
    }
}).listen(8124);

console.log('Server running at http://localhost:8124/');