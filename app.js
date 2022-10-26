
// Step 1: require modules:
var http = require('http');
var fs = require('fs');
var path = require('path');

// Step 2: Declare server variables
const hostname = '127.0.0.1';
const port = 8125;

// Step 3: Create Server

const server = http.createServer(function(request,response){
    
    var filePath = '.' + request.url;

    if(filePath == './'){
        filePath='./index.html';
    }

    // Check teh extension and if it is matche dwith one of the define MIMETypes
    // Otherwise, return default type 
    var extname = String(path.extname(filePath)).toLowerCase();

    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';


    fs.readFile(filePath, function(error, content){

        if(error){ //ENOENT : Error No ENTity - mean 'no such a file or directory'
            if(error.code=='ENOENT'){
                fs.readFile('./404.html', function(error,content){
                    response.writeHead(404,{'Content-Type': contentType});
                    response.end(content,'utf-8');
                })
            }

         else { // 500 : Internal Server Error
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error:' +error.code +'..\n');
            }
        } else { // 200 : Successfully response

            response.writeHead(200,{'Content-Type': contentType});
            response.end(content,'utf-8');
        }
    } );

});

// Step  - Listen Port

server.listen(port, hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});


    