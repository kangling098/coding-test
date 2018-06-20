// 实现一个静态服务
// 如果是目录 就将目录中的内容展现出来
// 如果是文件就将文件展示出来
let http = require('http');
let fs = require('fs');
let url = require('url');
let zlib = require('zlib');
let util = require('util');
let path = require('path');

let mime = require('mime');
let ejs = require('ejs'); // 渲染模板
let chalk = require('chalk'); // 粉笔
// 第二个参数可以指定环境变量在为什么值时才打印
// window set DEBUG=XXX  export DEBUG=XXXX
let debug = require('debug')('*');
// 运行的条件 指定主机名
// 指定启动的端口号
// 自定运行的目录
let stat = util.promisify(fs.stat);
let readdir = util.promisify(fs.readdir);
let config = require('./config');
let template = fs.readFileSync(path.resolve(__dirname, 'tmpl.html'), 'utf8');
class Server {
  constructor(args) {
    this.config = { ...config, ...args };// 将配置挂载在我们的实例上
    this.template = template;
  }
  async handleRequest(req, res) { // 这里的this都是实例
    let { pathname } = url.parse(req.url, true);
    let p = path.join(this.config.dir, pathname);
    // 1.根据路径 如果是文件夹 显示文件夹里的内容
    // 2.如果是文件 显示文件的内容
    try { // 如果没错误说明文件存在
      let statObj = await stat(p);
      if (statObj.isDirectory()) {
        // 现在需要一个当前目录下的解析出的对象或者数组
        let dirs = await readdir(p);
        dirs = dirs.map(dir => { // dirs就是要渲染的数据
          return {
            filename: dir,
            pathname: path.join(pathname, dir)
          }
        });
        let str = ejs.render(this.template, { dirs, title: 'ejs' });
        res.setHeader('Content-Type', 'text/html;charset=utf8');
        res.end(str);
      } else {
        // 文件 发送文件
        this.sendFile(req, res, p, statObj);
      }
    } catch (e) {
      // 文件不存在的情况
      this.sendError(req, res, e);
    }
  }
  // 实现其他功能
  // 实现范围请求

  // 实现缓存
  // 服务器  Cache-Control Expires  
  // Last-Modified  ETag:ctime+size
  // 客户端
  // if-modified-since if-none-match
  cache(req, res, p, stat) {
    // 实现缓存 
    let since = req.headers['if-modified-since'];
    let match = req.headers['if-none-match'];
    let ssince = stat.ctime.toUTCString();
    let smatch = stat.ctime.getTime() + stat.size;
    res.setHeader('Last-Modified', ssince);
    res.setHeader('ETag', smatch);
    res.setHeader('Cache-Control', 'max-age=6');
    if (since != ssince) {
      debug(since, ssince);
      return false;
    }
    if (match != smatch) {
      debug(match, smatch);
      return false
    }
    return true;
  }
  // 实现服务端压缩
  gzip(req, res, p, stat) {
    let header = req.headers['accept-encoding'];
    if (header) {
      if (header.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip')
        return zlib.createGzip();
      } else if (header.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate')
        return zlib.createDeflate();
      }
    } else {
      return false;
    }
  }
  range(req, res, p, stat) {
    let range = req.headers['range'];
    if(range){
      let [, start, end] = range.match(/(\d*)-(\d*)/) || [];
      start = start ? parseInt(start) : 0;
      end = end ? parseInt(end) : stat.size;
      res.statusCode = 206;
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Content-Length', end - start + 1);
      res.setHeader('Content-Range', `bytes ${start}-${end}/${stat.size}`);
      return { start, end };
    }else{
      return {start:0,end:stat.size}
    }
  }
  sendFile(req, res, p, stat) {
    if (this.cache(req, res, p, stat)) {// 检测是否有缓存
      res.statusCode = 304;
      res.end();
      return
    };
    let compress = this.gzip(req, res, p, stat);
    let { start, end } = this.range(req, res, p, stat); //范围请求，返回开始位置和结束位置
    if (compress) { // 返回的是一个压缩流
      res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8');
      fs.createReadStream(p, { start, end }).pipe(compress).pipe(res);
    } else {
      res.setHeader('Content-Type', mime.getType(p) + ';charset=utf8');
      fs.createReadStream(p, { start, end }).pipe(res);
    }
  }
  sendError(req, res, e) {
    // 解析字符串打印对象
    //debug(util.inspect(e).toString());
    res.statusCode = 404;
    res.end(`Not Found`);
  }
  start() {
    let server = http.createServer(this.handleRequest.bind(this));
    let { hostname, port } = this.config;
    debug(`http://${hostname}:${chalk.green(port)} start`)
    server.listen(port, hostname);
  }
}
// 开启一个服务
module.exports = Server