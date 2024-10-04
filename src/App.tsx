import React from 'react';
import logo from './logo.svg';
import './App.css';
import SudokuPanel from './components/SudokuPanel';

function App() {

  const [sudokuState, setSudokuState] = React.useState(() => {
    return Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () =>
          Array.from({ length: 3 }, () => Math.floor(Math.random() * 10))
        )
      )
    );
  });

  const handleCellChange = (rowIndex: number, colIndex: number, cellRowIndex: number, cellColIndex: number, newValue: number) => {
    setSudokuState(prevState => {
      const newState = [...prevState];
      newState[rowIndex][colIndex][cellRowIndex][cellColIndex] = newValue;
      return newState;
    });
  }

  return (
    <div className="App">
      <div className='CenterBox'>
        <div className='PannelGrid'>
          {
            sudokuState.map((row, rowIndex) => (
              row.map((col, colIndex) => (
                <SudokuPanel 
                  className={"PannelItem"} 
                  array={col}
                  onCellChange={(cellRowIndex, cellColIndex, newValue) => handleCellChange(rowIndex, colIndex, cellRowIndex, cellColIndex, newValue)}
                  key={`${rowIndex} - ${colIndex}`}
                />
              ))
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
