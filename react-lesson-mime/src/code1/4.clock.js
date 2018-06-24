import React,{Component} from 'react'
import {render} from 'react-dom'
// 组件 1) 必须组件名开头大写
// > 组件也是React元素/JSX元素
function Clock(props) {
  console.log(this);
  return <h1>时间是:{props.date}</h1>
}
// 缺陷：
// 1)函数组件 没有自己的状态
// 2)函数组件中没有this
// 3)没有声明周期

// render方法会渲染虚拟dom，但是只渲染一次
// render方法重复渲染只会 局部更新
setInterval(()=>{
  render(<div>
    <Clock date={new Date().toLocaleString()}></Clock>
  </div>, window.root);
},1000);
