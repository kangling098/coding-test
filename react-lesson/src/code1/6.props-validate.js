import React,{Component} from 'react';
import ReactDOM from 'react-dom';
// 校验属性的正确性 prop-types
import PropTypes from 'prop-types';
class Person extends Component{
  // ES6不支持静态属性 只有静态的方法
  // 校验属性类型
   static propTypes = {
     name: PropTypes.string.isRequired,
     age:PropTypes.string,
     gender:PropTypes.oneOf(['男','女']),
     hobby:PropTypes.arrayOf(PropTypes.string),
     pos:PropTypes.shape({
       x:PropTypes.number,
       y:PropTypes.number
     }),
     salary(props,property){
       if (props[property] > 3000){
         throw new Error('salary too big')
       }
     }
   }
   // 默认属性值
   static defaultProps = {
     name:'zfpx'
   }
   render(){
      return (<div>
         {this.props.name}
     </div>)
   }
}
let person = {
  name:'zfpx',
  age:'45',
  gender:'男',
  hobby:['睡觉','玩游戏'],
  pos:{
    x:100,
    y:2000
  },
  salary:200
}
ReactDOM.render(<Person {...person}></Person>,window.root);