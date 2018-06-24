import React from 'react'
import {render} from 'react-dom'

// 类组件 需要有自己的状态，需要继承父类组件
class Clock extends React.Component{
  constructor(props){
    super();
    this.state = {date:new Date().toLocaleString()}
  }
  componentDidMount(){ //组件挂载完成
    // react中提供了一个setState的方法可以更新状态
    setInterval(()=>{
      // 会将这个对象和原有的状态进行合并，合并后的结果重新渲染页面
      this.setState({ date: new Date().toLocaleString() })
    },1000);
  }
  render(){ // 每个类组件都有一个自己的render方法，会自动将render方法的返回值作为结果进行渲染
    console.log('render')
    // 再render方法中可以获取属性通过this.props可以获取属性
    return (
      <React.Fragment>
        <p>{this.props.name}</p>
        <div>{this.state.date}</div>
      </React.Fragment>
    )
  }
}
render(<Clock name="casio"></Clock>,window.root)