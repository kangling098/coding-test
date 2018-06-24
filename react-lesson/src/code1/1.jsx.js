let React = {
  createElement(type, props, ...children) {
    return { type, props, children }
  }
}
function render(vnode, container) {
  if (typeof vnode === 'string') {
    return container.appendChild(document.createTextNode(vnode));
  }
  let { type, props, children } = vnode;
  let ele = document.createElement(type);
  for (let key in props) {
    ele.setAttribute(key, props[key]);
  }
  children.forEach(child => {
    render(child, ele);// 循环子节点插入到元素中
  });
  container.appendChild(ele);
}
let element = <h1 title="hello">hello zfpx</h1>;
render(element, window.root);


// 环境会自动转义jsx语法
// 会转化成react语法
// 虚拟dom ->转化成真实的DOM

// react JSX元素
// 像html 不是html
// import React from 'react';
// import { render } from 'react-dom';
// let element = <h1 title="hello">hello zfpx</h1>
// render(element, document.getElementById('root'));