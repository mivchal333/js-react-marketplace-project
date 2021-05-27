import MaterialUiTableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React from "react";
import {Row, TableBodyPropGetter, TableBodyProps} from "react-table";
import {Product} from "../../model/product.model";

interface PropTypes {
    page: Row<Product>[],
    getTableBodyProps: (propGetter?: TableBodyPropGetter<Product>) => TableBodyProps,
    prepareRow: (row: Row<Product>) => void,
}

const TableBody = (props: PropTypes) => (
    <MaterialUiTableBody {...props.getTableBodyProps()}>
        {props.page.map((row: Row<Product>) => {
            props.prepareRow(row)
            return (
                <TableRow {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                    })}
                </TableRow>
            )
        })}
    </MaterialUiTableBody>)
export default TableBody
