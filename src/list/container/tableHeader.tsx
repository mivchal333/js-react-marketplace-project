import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import TableHead from "@material-ui/core/TableHead";
import {HeaderGroup} from "react-table";
import {Product} from "../../model/product.model";

interface PropTypes {
    headerGroups: HeaderGroup<Product>[],
}

const TableHeader = ({headerGroups}: PropTypes) => (
    <TableHead>
        {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        <span>
                    {column.isSorted
                        ? column.isSortedDesc
                            ? <ArrowDownwardIcon/>
                            : <ArrowUpwardIcon/>
                        : ''}
                  </span>
                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </TableCell>
                ))}
            </TableRow>
        ))}
    </TableHead>

)
export default TableHeader;
