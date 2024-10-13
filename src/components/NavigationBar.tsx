import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import NavigationPage from "../bean/NavigationPage"

interface NavigatorParam {
    currentPage: NavigationPage,
    changePage: (page: NavigationPage) => void
}


function NavigationBar(props: NavigatorParam) {

    const { currentPage, changePage } = props

    return (
        <TableContainer className="NavigationBarContainer">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            {
                                NavigationPage.values.map((page, index) => (
                                    <a 
                                        key={page.toString()} className={`NagationButton${currentPage === page ? "Selected" : "Unselected"}`}
                                        onClick={() => changePage(page)}>
                                        {
                                            `${page.name} ${(index !== NavigationPage.values.length - 1) ? " | " : ""}`
                                        }
                                    </a>
                                ))
                            }
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default NavigationBar