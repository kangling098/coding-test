import React from 'react';
import {render} from 'react-dom';
// jsx像html 但是他可以写js 有些特殊的属性和html不太一样
// 1)React.Fragment无意义的标签，相邻的两个jsx元素 / react元素 不能并列写，必须包起来,渲染数组也可以实现

// 2)jsx元素有些特殊的属性和html不太一样
// class->className;
// style-> 对象的形式
// for-> htmlFor
// dangerouslySetInnerHTML危险的设置元素中的内容
//  区分是js还是html 是根据 < html { js
// let str = '<h1>hello</h1>'; //xss攻击
// let element = (
//   <React.Fragment>
//     <div className="hello"></div>
//     {/*测试*/}
//     <div style={{color:'red'}}>hello</div>
//     <label htmlFor="username">xxxxxx</label>
//     <div dangerouslySetInnerHTML={{__html:str}}></div>
//   </React.Fragment>
// )
// render(element,window.root);

// 3) {}表达式的用法 <%=%>
// 表达式可以进行取值 得有返回值
// null 或者void 0都是一个合法的jsx元素
// 可以实现三元判断.....
let fn = ()=>1000;
let element = <div>
  {(function () {
    return 'hello'
  })()}
  {fn()}
  {123+'456'+789}
  {false?<div>hello</div>:void 0}
</div>
render(element,document.getElementById('root'));


