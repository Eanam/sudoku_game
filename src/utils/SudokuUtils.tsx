import { SudokuCell } from "../bean/SudokuCell";

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

// Convert the 3x3 array of 3x3 subgrids into a 9x9 board
function convertTo9x9Board<T>(blocks: T[][][][]): T[][] {
    const board: T[][] = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => ({} as T))
    );

    for (let blockRow = 0; blockRow < 3; blockRow++) {
        for (let blockCol = 0; blockCol < 3; blockCol++) {
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    board[blockRow * 3 + row][blockCol * 3 + col] = blocks[blockRow][blockCol][row][col];
                }
            }
        }
    }

    return board;
}

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


/**
 * verify sudoku game anser
 * @param result must be 3*3 array whose children contain a 3*3 array
 */
function verifySudokuAnswer(result: SudokuCell[][][][]) {
    if(result.length !== 3 || result.some((row) => row.length !== 3)) return false
    
    //verfiy whether each subgrid is satisfied
    for (let blockRowIndex = 0; blockRowIndex < 3; blockRowIndex ++) {
        for (let blockColIndex = 0; blockColIndex < 3; blockColIndex ++) {
            const block = result[blockRowIndex][blockColIndex]
            if(block.length !== 3 || block.some((col) => col.length !== 3)) {
                return false;
            }
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const blockNumbers = block.flat().map(cell => cell.value);
            if (!numbers.every(number => blockNumbers.includes(number)) || blockNumbers.length !== 9) {
                return false;
            }
        }
    }
    
    //caluate each row and each col
    const convertedResult = convertTo9x9Board(result)
    // Verify each row
    for (let row = 0; row < 9; row++) {
        const rowNumbers = convertedResult[row].map(cell => cell.value);
        if (!rowNumbers.every(number => number >= 1 && number <= 9) || rowNumbers.length !== 9 || new Set(rowNumbers).size !== 9) {
            return false;
        }
    }

    // Verify each column
    for (let col = 0; col < 9; col++) {
        const colNumbers = convertedResult.map(row => row[col].value);
        if (!colNumbers.every(number => number >= 1 && number <= 9) || colNumbers.length !== 9 || new Set(colNumbers).size !== 9) {
            return false;
        }
    }

    return true;
}

export { createInitialSudokuData, verifySudokuAnswer };