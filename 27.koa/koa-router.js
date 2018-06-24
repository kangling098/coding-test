class Layer {
    constructor(path, handler) {
        this.path = path;
        this.handler = handler;
    }
    match(p) {
        return p === this.path;
    }
}
class Router {
    constructor() {
        this.layers = [];
    }
    get(path, handler) {
        this.layers.push(new Layer(path, handler))
    }
    compose(ctx, handlers, next) {
        function dispatch(index) {
            if (index === handlers.length) return next();
            let h = handlers[index]
            return h(ctx, () => dispatch(index + 1));
        }
        return dispatch(0);
    }
    routes() {
        return async (ctx, next) => {
            // 获取当前匹配到的路由
            let handlers = this.layers.filter(layer => layer.match(ctx.path)).map(layer => layer.handler);
            this.compose(ctx, handlers, next);
        }
    }
}

module.exports = Router;

async (ctx, next) => {
    new Promise((resolve, reject) => {

    })
}
