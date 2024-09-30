import { TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

function SudokuPanel() {

    //parse items form props
    let items = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

    return (
        <TableContainer>
            <TableBody>
                {
                    items.map((row) => (
                        <TableRow>
                            {
                                row.map((item) => (
                                    <TableCell>
                                        {item}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    ))
                }
            </TableBody>
        </TableContainer>
    );

}

export default SudokuPanel;