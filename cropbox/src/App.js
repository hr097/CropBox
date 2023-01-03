// import React,{useEffect,useState} from 'react'

import './App.css';

function App() {
  // const [backdata,setbackdata] = useState([{}]);
  // useEffect(()=>{
  //   fetch("/api/submitfeedback",{
  //   body: {   
  //     "api_token" : "cropBox1008kbno9qessgzah1k5rjsnnwtr9yco2vlfgzw9nu5261",
  //     "name": "Shubham khunt", 
  //     "email": "shubhamkhunt4105gmail.com",
  //     "rating": 4.5,
  //     "description": "It's a fantastic app!"
  // }
  //   }).then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //        setbackdata(data);
  //       console.log(data);
  //     }
  //   )
  // },[])
  
  return (
    <div className="App">
        <h1>Select PDF File for crop</h1>
        <form method="post"  action="/" enctype="multipart/form-data">
          <input type="file" name="file"/>
          <input type="submit" value="Upload" />
        </form>
    </div>
  );
}

export default App;
