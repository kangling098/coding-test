import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class App extends Component {
  constructor() {
    super();
    this.state = { num: 0 };
    //this.fn = this.fn.bind(this)
  }
  fn = () => { //es7 的箭头函数
    // setState 是批量更新的 不一定是同步的
    // 可以写成函数的方式
    // this.setState({ num: this.state.num+1},()=>{
    //   this.setState({ num: this.state.num + 1 },()=>{
    //     this.setState({ num: this.state.num + 1 });
    //   });
    // });
    this.timer = setInterval(()=>{
      this.setState((prevState) => ({ num: prevState.num + 1 }));
    },1000);
    //this.setState((prevState) => ({ num: prevState.num + 1 }));
  }
  componentWillUnmount(){ //销毁
    clearTimeout(this.timer); // 清除事件订阅
  }
  remove = () => {
    // 卸载组件
    ReactDOM.unmountComponentAtNode(window.root);
  }
  render() {
    return (<div>
      {this.state.num}
      <button onClick={this.fn}>+</button>
      <button onClick={this.remove}>删除组件</button>
    </div>)
  }
}
ReactDOM.render(<App></App>, window.root);