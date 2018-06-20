let http = require('http');
let url = require('url');
function createApplication() {
  let app = (req, res) => {
    console.log('xxxx')
    let reqMethod = req.method.toLowerCase();
    let { pathname } = url.parse(req.url, true);
    console.log(reqMethod,pathname);
    let index = 0;
    function next() {
      if(index === app.routes.length) {
        res.statusCode = 404;
        res.end(`Cannot ${reqMethod} ${pathname}`);
        return 
      }
      let { method, path, handler } = app.routes[index++];
      if (method === 'middleware') {
        if (pathname === path || path == '/' || pathname.startsWith(path + '/')) {
          handler(req, res, next);
        } else {
          next(); //  没有迭代到 就执行下一个中间件
        }
      } else {
        // 路由
        if(path.params){
          // 到路径参数的路由
          if(path.test(pathname)){
            let params = {}
            let values = pathname.match(path).slice(1);
            values.forEach((value,index)=>{
              params[path.params[index]] = value
            });
            req.params = params; // 把参数挂载到req上
            handler(req,res);
          }else{
            next();
          }
        }else{
          if ((method === reqMethod || method === 'all') && (pathname === path || path === '*')) {
            handler(req, res);
          } else {
            next();
          }
        }
      }
    }
    next();
  }
  app.routes = [];
  let methods = ['get', 'post', 'put', 'delete', 'options'];
  app.use = function (path, handler) {
    if (typeof handler != 'function') {
      handler = path;
      path = '/'
    }
    app.routes.push({
      method: 'middleware',
      path,
      handler
    });
  }
  app.all = function (path, handler) {
    app.routes.push({
      method: 'all',
      path,
      handler
    })
  }
  methods.forEach(method => {
    app[method] = function (path, handler) {
      // 带路径参数的路由
      let params = [];
      if(path.includes(':')){// 如果路由带有：号的情况，就把这个路径转化成正则
        path = path.replace(/:([^\/]+)/g,function () {
          params.push(arguments[1]);
          return '([^\/]+)';
        });
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

  app.listen = (...args) => {
    let server = http.createServer(app);
    server.listen(...args);
  }
  return app;
}

module.exports = createApplication;