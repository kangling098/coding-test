let http = require('http');
let EventEmitter = require('events');
let context = require('./context');
let request = require('./request');
let response = require('./response');
let stream = require('stream');
class Koa extends EventEmitter{
  constructor(){
    super();
    this.context = context;
    this.request = request;
    this.response = response;
    this.middlewares = []
  }
  use(fn){
    this.middlewares.push(fn);
  }
  createContext(req,res){
    // 创建ctx对象 request和response是自己封装的
    let ctx = Object.create(this.context);
    ctx.request = Object.create(this.request);
    ctx.response = Object.create(this.response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }
  compose(middlewares,ctx){
    function dispatch(index) {
      if (index === middlewares.length) return Promise.resolve()
      let fn = middlewares[index];
      return Promise.resolve(fn(ctx,()=>dispatch(index+1)))
    }
    return dispatch(0);
  }
  handleRequest(req,res){
    // 通过req和res产生一个ctx对象
    let ctx = this.createContext(req,res);
    // composeFn是组合后的promise
    res.statusCode = 404;
    let composeFn = this.compose(this.middlewares, ctx)
    composeFn.then(()=>{
      let body = ctx.body;
      if (body instanceof stream) {
        body.pipe(res);
      }else if(typeof body === 'object'){
        res.end(JSON.stringify(body));
      }else if(typeof body === 'string' || Buffer.isBuffer(body)){
        res.end(body);
      }else{
        res.end('Not Found');
      }
    }).catch(err=>{ // 如果其中一个promise出错了就发射错误事件即可
      this.emit('error',err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    })
  }
  listen(){
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(...arguments);
  }
}
module.exports = Koa;
