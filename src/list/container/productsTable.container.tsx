import React from 'react';
import {connect, ConnectedProps} from "react-redux";
import {useFilters, useGlobalFilter, usePagination, useSortBy, useTable} from 'react-table'
import {RootState} from "../../store/store";
import {getProducts, isLoading} from "../../store/products/products.selector";
import {columns} from "../tableConfig/columns";
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import GlobalFilter from "./tableFilter/globalFilter";
import TableHeader from "./tableHeader";
import TableFooter from "./tableFooter";
import CategoryField from "./categoryField";

const ProductsTableContainer = (props: PropsFromRedux) => {


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
        gotoPage,
        setPageSize,
        setFilter
    } = useTable({
            columns,
            data: props.products,
            initialState: {
                hiddenColumns: ["categories"]
            }
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    )
    console.log(page.map(page => page.original.categories))
    console.log('f', state.filters)

    return (
        <div>
            <div style={{display: "flex"}}>
                <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter}/>
                <CategoryField setFilter={setFilter}/>
            </div>
            <MaUTable {...getTableProps()}>
                <TableHeader headerGroups={headerGroups}/>
                <TableBody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter state={state} rowsLength={rows.length} gotoPage={gotoPage} setPageSize={setPageSize}/>
            </MaUTable>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    products: getProducts(state),
    isLoading: isLoading(state),
})
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(ProductsTableContainer)
