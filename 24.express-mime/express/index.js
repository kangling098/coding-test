let http =require('http');
let url = require('url');
function createApplication(){
  let app = (req,res)=>{
    let reqMethod = req.method.toLowerCase();
    let { pathname } = url.parse(req.url,true);
    let index = 0;
    function next(){
      if(index === app.routes.legnth){
        res.statusCode = 404;
        res.end(`Cannot ${reqMethod} ${pathname}`);
        return 
      }
      let {method,path,handler} = app.routes[index++];
      if(method === 'middleware'){
        // 当路径相同,或者当路径为根路径时,亦或者路径以pathname+'/'开头时,执行回调
        if(pathname === path || path == '/' || pathname.startsWith(pathname+'/')){
          handler(req,res,next);
        }else{
          next() // 没有迭代到 就执行下一个中间件
        }
      }else{
        // 为路由的时候,如果有params,那么,肯定是带参数的路由了
        if(path.params){
          if(path.test(pathname)){
            let params = {};
            let values = pathname.match(path).slice(1); // 按顺序获取到匹配的参数
            for(let i = 0; i< path.params.length; i++){
              params[path.params[i]] = values[i]
            }
            req.params = params; // 把参数挂载到req上
            handler(req,res);
          }else{
            next();
          }
        }else{ // 为正常路由时
          if((method === reqMethod || method === 'all')&&(pathname===path || path === '*')){
            handler(req,res);
          }else{
            next();
          }

        }
      }
    }
  }
  app.routes = [];
  let methods = ['get','post','put','delete','options'];
  app.use = function(path,handler){
    // 当没传路径时,默认路径为根路径
    if(typeof handler!=='function'){
      handler = path;
      path = '/';
    }
    app.routes.push({
      method:'middleware',
      path,
      handler
    });
  }
  app.all = function(path,handler){
    app.routes.push({
      method:'all',
      path,
      handler
    })
  }
  methods.forEach(method=>{
    app[method] = function(path,handler){
      // 带路径参数的路由
      let params = [];
      if(path.includes(':')){ // 如果路由带有:号的情况,就把这个路径转化成正则,没有的话,就不做处理
        path = path.replace(/:[^\/]+/g,function(){
          params.push(arguments[1]);
          return '([^\/+])';
        })
        path = new RegExp(path);
        path.params = params;
      }
      app.routes.push({
        method,
        path,
        handler
      })
    }
  })

  app.listen = (...args) =>{
    // 将app作为回调函数传入createServer
    let server = http.createServer(app);
    server.listen(...args);
  }

  return app;
}

module.exports= createApplication;