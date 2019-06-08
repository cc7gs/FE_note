const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {

    const html = fs.readFileSync('test.html', 'utf-8');
    /**
     * max-age 代表浏览器端缓存时间
     * s-maxage 代表代理缓存时间
     * no-store 表示不缓存
     * Vary: 表示 x-Test-Cache 头信息值相等时才缓存
     */
    res.writeHead(200, {
        "Content-Type": 'text/html',
        "Cache-Control":"max-age=20",
        // "Vary":"x-Test-Cache",
        'Content-Security-Policy': 'default-src http:'
    })
    res.end(html);

}).listen(8888, () => {
    console.log('server start port at 8888');
});

