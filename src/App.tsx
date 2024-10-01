import React from 'react';
import logo from './logo.svg';
import './App.css';
import SudokuPanel from './components/SudokuPanel';

function App() {
  return (
    <div className="App">
      <div className='CenterBox'>
        <div className='PannelGrid'>
          {
            Array.from({ length: 9 }, (_, index) => (
              <SudokuPanel  className={"PannelItem"} key={index}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
