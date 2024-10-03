import { TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useState } from "react";

interface SudokuPanelProps {
    className?: string
}

function SudokuPanel(props: SudokuPanelProps) {

    const [items, setItems] = useState([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

    const handleInputChange = (rowIndex: number, itemIndex: number, value: number) => {
        const newItems = [...items];
        newItems[rowIndex][itemIndex] = value;
        setItems(newItems);
    }

    return (
        <div className={props.className}>
            <TableContainer>
                <TableBody>
                    {
                        items.map((row, rowIndex) => (
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