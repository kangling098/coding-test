import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class ChildCounter extends Component{
  componentWillMount(){
    console.log('child componentWillMount')
  }
  // React16 被替换了 他是一个唯一可以调用setState的函数
  componentWillReceiveProps(newProps){ // 接收到新的属性后才可以执行，第一次不会执行
    console.log(newProps)
  }
  shouldComponentUpdate(){
    console.log('child shouldComponentUpdate');
    return false;
  }
  render(){
    console.log('child render')
    return <div style={{border:'1px solid red'}}>{this.props.num}</div>
  }
  componentDidMount(s){
    console.log('child componentDidMount')
  }
}
class Counter extends Component {
  constructor() {
    super();
    this.state = { num: 0 };
    console.log('constructor');
  }
  componentWillMount() { // 不推荐再次使用
    console.log('componentWillMount');
  }
  // 调用setState就会更新视图,优化 immutablejs
  shouldComponentUpdate(nextProps,nextState){
    console.log('shouldComponentUpdate');
    // 控制状态变化后 是否更新视图
    return nextState.num%2
  }
  componentWillUpdate(){
    console.log('componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  render() { // 渲染
    return (<div>
      {this.state.num}
      <button onClick={()=>{
        this.setState({num:this.state.num+1});
      }}>+</button>
      <ChildCounter num={this.state.num}></ChildCounter>
    </div>)
  }
  componentDidMount(){ // 组件挂载完成
    console.log('componentDidMount');
  }
}
ReactDOM.render(<Counter></Counter>,window.root);