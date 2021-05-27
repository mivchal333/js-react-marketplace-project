import React, {useEffect} from 'react';
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {useFilters, useGlobalFilter, useTable} from 'react-table'
import {RootState} from "../../store/store";
import {getProducts, isLoading} from "../../store/products/products.selector";
import ProductService from "../../service/products.service";
import {setIsLoading, setProducts} from "../../store/products/products.slice";
import {columns} from "../tableConfig/columns";
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import GlobalFilter from "./tableFilter/globalFilter";


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
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({
            columns,
            data: props.products,
        },
        useFilters,
        useGlobalFilter,
    )

    return (
        <div><GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter}/>

            <MaUTable {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    <span>{column.canFilter ? column.render('Filter') : null}</span>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
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
