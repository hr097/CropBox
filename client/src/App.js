import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <form ref='uploadForm' 
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
