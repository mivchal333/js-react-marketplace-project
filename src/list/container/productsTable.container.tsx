import React from 'react';
import {connect, ConnectedProps} from "react-redux";
import {useFilters, useGlobalFilter, usePagination, useSortBy, useTable} from 'react-table'
import {RootState} from "../../store/store";
import {getProducts, isLoading} from "../../store/products/products.selector";
import {columns} from "../tableConfig/columns";
import MaUTable from '@material-ui/core/Table'
import GlobalFilter from "./tableFilter/globalFilter";
import TableHeader from "./tableHeader";
import TableFooter from "./tableFooter";
import CategoryField from "./categoryField";
import TableBody from "./tableBody";

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
    return (
        <div style={{padding: "2em"}}>
            <div style={{display: "flex", alignItems: "center"}}>
                <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter}/>
                <CategoryField setFilter={setFilter}/>
            </div>
            <MaUTable {...getTableProps()}>
                <TableHeader headerGroups={headerGroups}/>
                <TableBody page={page} getTableBodyProps={getTableBodyProps} prepareRow={prepareRow}/>
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
