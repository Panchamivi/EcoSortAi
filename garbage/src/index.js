import React from 'react';
import  ReactDom from 'react-dom';
import App from './App';

// function Greeting() {
//   return <h4> this is my fisrt component </h4>;
// }

// const Greeting = () => {
//   return React.createElement('h1',{},'hello world');
// };

const img = 'https://sp.yimg.com/ib/th?id=OIP.Ka7686Vch_6okNuXbI3QVQHaE8&pid=Api&w=148&h=148&c=7&dpr=2&rs=1';
const box = {
  b1:'box1',
  b2:'box2',
};
function Greeting() {
  return (
      <App/>
  )
};
ReactDom.render(<Greeting />,document.getElementById('root'));



