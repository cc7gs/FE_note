const http = require('http');
const ejs=require('ejs');
const colors = require('colors/safe')
const opener = require('opener');
const mime =require('mime');
const path=require('path')
const fs=require('fs').promises;
const {createReadStream,createWriteStream,lstatSync}=require('fs');

class HttpServer {
  constructor(opts) {
    this.opts = opts;
    this.headers=opts.headers||{};

    if (opts.root) {
      this.root = opts.root;
    }
    else {
      try {
        lstatSync('./public');
        this.root = './public';
      }
      catch (err) {
        this.root = './';
      }
    }
  }
  async requestListener(req, res){
    const url=new URL(req.url, `http://${req.headers.host}`);
    this.pathname=decodeURIComponent(url.pathname);
    const filePath=path.join(this.opts.directory,this.pathname);
    try {
      const statObj=await fs.stat(filePath);
      if(statObj.isDirectory()){
        const resolvePath=path.join(filePath,'index.html');
        fs.access(resolvePath)
        .then(()=>{
          res.setHeader('Content-Type',`${mime.getType(resolvePath)};charset=utf-8`);
          createReadStream(resolvePath).pipe(res);
        })
        .catch(e=>{
        this.showList(req,res,filePath);
       });
        return
      }
      res.setHeader('Content-Type',`${mime.getType(filePath)};charset=utf-8`);
      createReadStream(filePath).pipe(res);
    } catch (error) {
      console.log(error)
      res.statusCode=404;
      res.end('Not found');
    }
  }
  async showList(req,res,filePath){
    const dirs=await fs.readdir(filePath);
    const pathDirs=dirs.map(dir=>({
      dir,
      path:path.join(this.pathname,dir)
    }))
    const html = ejs.render(`<% dirs.forEach(function(item){ %>
        <li><a href="<%=item.path%>"><%=item.dir%></a></li>
      <%})%>`, {dirs:pathDirs});
    res.setHeader('Content-Type','text/html;charset=utf-8')
    res.end(html) 
  } 
  start() {
    const server = http.createServer(this.requestListener.bind(this));
    server.listen(this.opts.port, this.opts.host, () => {
      const { port, host, ssl } = this.opts
      const canonicalHost = this.opts.host === '0.0.0.0' ? '127.0.0.1' : host,
        protocol = ssl ? 'https://' : 'http://';

      console.log([colors.yellow('Starting up http-server, serving '),
      colors.cyan(this.root),
      ssl ? (colors.yellow(' through') + colors.cyan(' https')) : '',
      colors.yellow('\nAvailable on:')
      ].join(''));

      console.log('Hit CTRL-C to stop the server');
      var openUrl = protocol + canonicalHost + ':' + port;
      console.log('open: ' + openUrl);
      // opener(openUrl);
    })
  }
}
module.exports = HttpServer;