import React,{ Component } from 'react';
import Menu from './components/MenuComponent';
import './App.css';
import Main from './components/MainComponent';



class App extends Component {

  render(){
    return (
      <div className="App">
        <Main/>
      </div>
    )
  }
  
}

export default App;
