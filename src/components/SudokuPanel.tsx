import { TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

interface SudokuPanelProps {
    className?: string
}

function SudokuPanel(props: SudokuPanelProps) {

    //parse items form props
    let items = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

    return (
        <div className={props.className}>
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
        </div>
    );

}

export default SudokuPanel;