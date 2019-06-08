const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {

    const html = fs.readFileSync('test.html', 'utf-8');
    res.writeHead(200, {
        "Content-Type": 'text/html',
        'Content-Security-Policy': 'default-src http:'
    })
    res.end(html);

}).listen(8888, () => {
    console.log('server start port at 8888');
});

