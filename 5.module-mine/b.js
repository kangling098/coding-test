// 什么是commonjs规范
// 定义了如何导入模块 require
// 还定义了如何导出模块 module.exports 导出xxx
// 还定义了一个js就是一个模块

let fs = require('fs');
let path = require('path');
let vm = require('vm');
function Module(p){
    this.id = p; // 当前模块的标识
    this.exports = {}; // 每个模块都有一个exports属性
    this.loaded = fasle; // 每个模块默认都没有加载完成
}

// 所有的加载策略 
Module.wrapper = ['function(exports,require,module){','\n})'];
Module._extensions = {
    '.js': function(){

    },
    '.json':function(){},
    '.node':function(){}
}
Module._cacheModule = {} //根据的是全局路径进行缓存的
// 解析绝对路径的方法 返回一个绝对路径
Module._resolveFileName = function(miduleId){
    let p = path.resolve(moduleId);
    // 没有后缀我就加上后缀,有的话直接返回
    if(!path.extname(moduleId)){
        let arr = Object.keys(Module._extensions);
        for (let i = 0;i < arr.length;i++){
            let file = p + arr[i];
            try {
                fs.accessSync(file);
                return file;
            }catch(e){
                console.log(e);
            }
        }
    }else {
        return p;
    }
}















function req(moduleId){
    let p = Module._resolveFileName(moduleId); // p是一个绝对路径
    // 缓存中存在时直接返回缓存中module的exports
    if (Module._cacheModule[p]){
        return Module._cacheModule[p].exports;
    }
    let module = new Module(p);
    // 加载模块
    let content = module.load(p);
    Module._cacheModule[p] = module;
    module.exports = content;
    return module.exports;
}