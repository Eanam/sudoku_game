function createInitialSudokuData() {
    const rawData = generateSudokuBoard();
    const processedData = rawData.map((row) => {
        const processedRow = row.map((col) => {
            const modifiable = col === 0;
            const result = {
                modifiable: modifiable,
                value: col
            };
            return result
        });
        return processedRow;
    });
    return convertTo3x3Blocks(processedData);
}


function generateSudokuBoard(): number[][] {
    const board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
  
    // Helper function to check if placing a number is valid
    function isValid(board: number[][], row: number, col: number, num: number): boolean {
      // Check row
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) return false;
      }
  
      // Check column
      for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) return false;
      }
  
      // Check 3x3 grid
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[startRow + i][startCol + j] === num) return false;
        }
      }
  
      return true;
    }
  
    // Recursive backtracking function to fill the board
    function fillBoard(board: number[][]): boolean {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            for (let num = 1; num <= 9; num++) {
              if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (fillBoard(board)) {
                  return true;
                }
                board[row][col] = 0; // Backtrack
              }
            }
            return false; // Trigger backtrack if no number fits
          }
        }
      }
      return true;
    }
  
    // Function to remove numbers to create a playable board
    function removeNumbers(board: number[][], numToRemove: number): void {
      let attempts = numToRemove;
      while (attempts > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
          board[row][col] = 0;
          attempts--;
        }
      }
    }
  
    // Fill the entire board with valid numbers
    fillBoard(board);
  
    // Remove numbers to create the initial puzzle (e.g., remove 40 numbers)
    removeNumbers(board, 40);
  
    return board;
}

  // Convert the 9x9 board into 3x3 subgrids
  
  // Convert the 9x9 board into a 3x3 array of 3x3 subgrids
  function convertTo3x3Blocks<T>(board: T[][]): T[][][][] {
    const blocks: T[][][][] = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => Array(3).fill(0))
      )
    );

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const blockRow = Math.floor(row / 3);
        const blockCol = Math.floor(col / 3);
        blocks[blockRow][blockCol][row % 3][col % 3] = board[row][col];
      }
    }

    return blocks;
  }
  

export { createInitialSudokuData };