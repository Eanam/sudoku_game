import { TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useState } from "react";
import { SudokuCell } from "../bean/SudokuCell";

interface SudokuPanelProps {
    className?: string,
    array: SudokuCell[][],
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
                            <TableRow key={`Row - ${rowIndex}`}>
                                {
                                    row.map((item, itemIndex) => (
                                        <TableCell
                                            className={item.modifiable ? "InputBox" : "NonInputBox"}
                                            key={`Cell - ${rowIndex} - ${itemIndex}`}>
                                            {item.modifiable && 
                                                <input
                                                className="SudokuInput"
                                                type="number"
                                                value={item.value === 0 ? "" : item.value}
                                                min={1}
                                                max={9}
                                                onInput={(e) => {
                                                    const value = parseInt(e.currentTarget.value);
                                                    if (value < 1 || value > 9) {
                                                        e.currentTarget.value = item.value.toString();
                                                    }
                                                }}
                                                onChange={(e) => handleInputChange(rowIndex, itemIndex, Number(e.target.value) || 0)} />
                                            }

                                            {
                                                !item.modifiable &&
                                                <p className="SudokuFixedCell">
                                                    {item.value}
                                                </p>
                                            }
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