import logo from './cropbox.png';
import { useRef } from "react";
import './App.css';

function App() {
  const textInput = useRef(null);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" id="mainlogo" alt="CropBox" />
      
           <form 
              ref = {textInput}
              id='uploadForm' 
              action='/api/upload' 
              method='post' 
              encType="multipart/form-data">

              <label for="images" class="drop-container labelText">
                  <span class="drop-title labelText">Drop File Here</span>
                or
                  <input type="file"  name="pdf" id="pdfs" accept=".pdf" required/>
              
                  <select id="plateform" name="plateform" required>
                    <option value="flipkart">Flipkart</option>
                    <option value="meesho">Meesho</option>
                  </select>

                  <input type='submit' class="button-1" role="button" value='Upload' />
              </label>
          </form>	
        </header>
    </div>
    
  );
}

export default App;
