import React from 'react';
import logo from './logo.svg';
import './App.css';
import SudokuPanel from './components/SudokuPanel';
import { Button } from '@mui/material';
import { createInitialSudokuData, verifySudokuAnswer } from './utils/SudokuUtils';

function App() {

  const [sudokuState, setSudokuState] = React.useState(() => {
    return createInitialSudokuData()
  });

  const handleCellChange = (rowIndex: number, colIndex: number, cellRowIndex: number, cellColIndex: number, newValue: number) => {
    setSudokuState(prevState => {
      const newState = [...prevState];
      newState[rowIndex][colIndex][cellRowIndex][cellColIndex].value = newValue;
      return newState;
    });
  }

  const handRefresh = () => {
    setSudokuState(createInitialSudokuData())
  }

  const verifyAnswer = () => {
    const result = verifySudokuAnswer(sudokuState)
    console.log("verify result: ", result)
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
        <div style={{ marginTop: '20px' }}></div>
        <div className='PannelButtonArea'>
          <button 
            className='CommonButton'
            onClick={handRefresh}>
                Refresh
            </button>

            <button 
              className='CommonButton'
              onClick={verifyAnswer}>
                Check
            </button>
        </div>
      </div>
    </div>
  );
}

export default App;
