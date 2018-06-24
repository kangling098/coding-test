import React,{Component} from 'react'
import {render} from 'react-dom';
let arrs = ['不吃饭','吃饭'];
// 再react中使用map时 必须要增加key 属性key的名字是固定的
// dom-diff 
// 函数可以返回jsx 
function toLis(num) {
  return arrs.map((item,key)=>(
    <li key={key}>{item+num}</li>
  ))
}
let ele = toLis('1')
render(ele,window.root);

// 组件化 复用 提高可维护性
// 组件的组成 react元素组成的,组件就是一个函数
// 组件(函数组件  类组件) 属性 状态
