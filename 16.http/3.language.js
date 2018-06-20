// 多语言 
let pack = {
  'zh-CN':'你好',
  'zh':'nihao',
  'en':'hello',
  'fr':'Bonjour'
}
let defaultLanguage = 'en'; // 默认是英语
let http = require('http');
http.createServer(function (req,res) {
  let lang = req.headers["accept-language"];
  if(lang){ // 如果有多语言
    let langs = lang.split(',');
    // [{name:'zh-CN',q:1},{name:'en',q:0.8}]
    langs = langs.map(l=>{
      let [name,q] = l.split(';');
      q = q?Number(q.split('=')[1]):1;
      return {name,q}
    }).sort((lan1,lan2)=>lan2.q-lan1.q);
    for(var i = 0;i<langs.length;i++){ // 循环每一种语言看看包里有没有，如果有返回对应的语言
      if(pack[langs[i].name]){
        res.setHeader('Content-Language', langs[i].name);
        res.end(pack[langs[i].name]);
        return;
      }
    }
    // 没有默认语言
    res.setHeader('Content-Language', 'en')
    res.end(pack[defaultLanguage]);// 默认语言;
  }else{
    res.setHeader('Content-Language', 'en')
    res.end(pack[defaultLanguage]);// 默认语言;
  }
  
}).listen(3000);
//accept-language: zh-CN,zh;q=0.7,en;q=0.8,fr;q=0.1