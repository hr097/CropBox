// import logo from './logo.svg';
import { useRef } from "react";
import './App.css';

function App() {
  const textInput = useRef(null);
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <form 
            ref = {textInput}
            id='uploadForm' 
            action='/api/upload' 
            method='post' 
            encType="multipart/form-data">
              <input type="file" name="pdf" />
              <input type='submit' value='Upload' />
        </form>	
    </div>
    
  );
}

export default App;
