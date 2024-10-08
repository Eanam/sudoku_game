import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"


function NavigationBar() {
    return (
        <TableContainer className="NavigationBarContainer">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <a className="NagationButtonUnselected">Game</a>
                            {" | "}
                            <a className="NagationButtonSelected">History</a>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default NavigationBar