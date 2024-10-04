import { TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useState } from "react";

interface SudokuPanelProps {
    className?: string,
    array: number[][],
    onCellChange: (row: number, col: number, value: number) => void,
}

function SudokuPanel(props: SudokuPanelProps) {

    if (props.array.length !== 3 || props.array.some(row => row.length !== 3)) {
        throw new Error("Values must be a 3x3 array");
    }



    const handleInputChange = (rowIndex: number, itemIndex: number, value: number) => {
        props.onCellChange(rowIndex, itemIndex, value)
    }

    return (
        <div className={props.className}>
            <TableContainer>
                <TableBody>
                    {
                        props.array.map((row, rowIndex) => (
                            <TableRow>
                                {
                                    row.map((item, itemIndex) => (
                                        <TableCell 
                                            className="InputBox">                                            
                                            <input
                                                className="SudokuInput"
                                                type="number"
                                                value={item === 0 ? "" : item}
                                                min={1}
                                                max={9}
                                                onInput={(e) => {
                                                    const value = parseInt(e.currentTarget.value);
                                                    if (value < 1 || value > 9) {
                                                        e.currentTarget.value = item.toString();
                                                    }
                                                }}
                                                onChange={(e) => handleInputChange(rowIndex, itemIndex, Number(e.target.value) || 0)} />
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </TableContainer>
        </div>
    );

}

export default SudokuPanel;