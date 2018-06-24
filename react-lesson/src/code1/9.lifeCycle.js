import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class ChildCounter extends Component {
  constructor(){
    super();
    this.state = {}
  }
  static getDerivedStateFromProps(newProps) { // 接收到新的属性后才可以执行，第一次不会执行
    console.log('willReceiveProps')
    return {num:1};
  }
  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log('component will update');
    return '123';
  }
  shouldComponentUpdate() {
    console.log('child shouldComponentUpdate');
    return true;
  }
  render() {
    return <div style={{ border: '1px solid red' }}>{this.props.num}</div>
  }
  componentDidUpdate(a,b,c){
    console.log('child 更新完毕', c);
  }
  componentDidMount() {
    console.log(this.state)
    console.log('child componentDidMount')
  }
}
class Counter extends Component {
  constructor() {
    super();
    this.state = { num: 0 };
    console.log('constructor');
  }
  componentWillMount() { 
    console.log('componentWillMount');
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return nextState.num % 2
  }
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  render() { 
    return (<div>
      {this.state.num}
      <button onClick={() => {
        this.setState({ num: this.state.num + 1 });
      }}>+</button>
      <ChildCounter num={this.state.num}></ChildCounter>
    </div>)
  }
  componentDidMount() { 
    console.log('componentDidMount');
  }
}
ReactDOM.render(<Counter></Counter>, window.root);