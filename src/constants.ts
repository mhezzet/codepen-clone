export const initialCode = `
import React, { useState } from 'react';
import ReactDom from 'react-dom';

const App = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter((prevCount) => prevCount + 1)}>
        click me
      </button>
    </div>
  );
};

ReactDom.render(<App />, document.querySelector('#root'));

`

export const initialHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
  #error {
    position: fixed; /* Sit on top of the page content */
    display: none; /* Hidden by default */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
  }

  #error-content{
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 24px;
    color: #a80a0a;
    transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
  }
  </style>
</head>
<body>
  <div id="error"></div>
  <div id="root"></div>
  <script>
    
    window.addEventListener('message',(event)=>{
      try{
        if(document.querySelector("#error").innerHTML){
          document.querySelector("#error").style.display = "none"
        }
       
        eval(event.data)
      }catch(error){

        document.querySelector("#error").innerHTML = '<div id="error-content"><h4>Runtime Error</h4><p>'+ error +'</p></<div>'
        document.querySelector("#error").style.display = "block"

      }
      
    },false)
  </script>
</body>
</html>
`
