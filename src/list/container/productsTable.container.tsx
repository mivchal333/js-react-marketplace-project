import React, {useEffect} from 'react';
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {useFilters, useGlobalFilter, usePagination, useSortBy, useTable} from 'react-table'
import {RootState} from "../../store/store";
import {getProducts, isLoading} from "../../store/products/products.selector";
import ProductService from "../../service/products.service";
import {setIsLoading, setProducts} from "../../store/products/products.slice";
import {columns} from "../tableConfig/columns";
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import GlobalFilter from "./tableFilter/globalFilter";
import TableHeader from "./tableHeader";
import TableFooter from "./tableFooter";

const ProductsTableContainer = (props: PropsFromRedux) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIsLoading(true))
        ProductService.loadProducts()
            .then(products => {
                dispatch(setProducts(products))
                dispatch(setIsLoading(false))
            })
    }, [])

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
    } = useTable({
            columns,
            data: props.products,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    return (
        <div>
            <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter}/>
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
