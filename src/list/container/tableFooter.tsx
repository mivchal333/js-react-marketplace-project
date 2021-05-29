import React from "react";
import TableRow from "@material-ui/core/TableRow";
import {
    createStyles,
    IconButton,
    TableFooter as MaterialTableFooter,
    TablePagination,
    Theme,
    useTheme
} from "@material-ui/core";
import {toNumber} from "lodash-es";
import {TablePaginationActionsProps} from "@material-ui/core/TablePagination/TablePaginationActions";
import {TableState} from "react-table";
import {Product} from "../../model/product.model";
import {makeStyles} from "@material-ui/core/styles";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

interface PropTypes {
    state: TableState<Product>,
    rowsLength: number;
    gotoPage: (page: number) => void,
    setPageSize: (page: number) => void,
}

const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }),
);

function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles1();
    const theme = useTheme();
    const {count, page, rowsPerPage, onChangePage} = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    );
}

const TableFooter = ({state, rowsLength, gotoPage, setPageSize}: PropTypes) => {
    const rowsPerPageOptions = [5, 10, 25];
    return (
        <MaterialTableFooter>
            <TableRow>
                {rowsLength > rowsPerPageOptions[0] && (
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageOptions}
                        colSpan={3}
                        count={rowsLength}
                        rowsPerPage={state.pageSize}
                        page={state.pageIndex}
                        onChangePage={(event, newPage) => {
                            gotoPage(newPage)
                        }}
                        onChangeRowsPerPage={(event) => {
                            setPageSize(toNumber(event.target.value))
                        }}
                        ActionsComponent={TablePaginationActions}
                    />
                )}
            </TableRow>
        </MaterialTableFooter>
    );
}
export default TableFooter;
