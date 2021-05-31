import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import {HeaderGroup} from "react-table";
import {Product} from "../../model/product.model";
import {TableSortLabel} from "@material-ui/core";

interface PropTypes {
    headerGroups: HeaderGroup<Product>[],
}

const TableHeader = ({headerGroups}: PropTypes) => (
    <TableHead>
        {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <TableCell key={column.id}>
                        <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <TableSortLabel
                                hideSortIcon={column.disableFilters}
                                active={column.isSorted}
                                direction={column.isSortedDesc ? 'desc' : 'asc'}
                            />
                        </div>
                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                    </TableCell>
                ))}
            </TableRow>
        ))}
    </TableHead>

)
export default TableHeader;
