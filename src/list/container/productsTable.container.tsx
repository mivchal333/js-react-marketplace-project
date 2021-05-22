import React, {useEffect} from 'react';
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {useTable} from 'react-table'
import {RootState} from "../../store/store";
import {getProducts, isLoading} from "../../store/products/products.selector";
import {loadProducts} from "../service/products.service";
import {setIsLoading, setProducts} from "../../store/products/products.slice";
import {columns} from "../tableConfig/columns";
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'


const ProductsTableContainer = (props: PropsFromRedux) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIsLoading(true))
        loadProducts()
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
    } = useTable({
        columns,
        data: props.products,
    })

    return (
        <MaUTable {...getTableProps()}>
            <TableHead>
                {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
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
    )
}

const mapStateToProps = (state: RootState) => ({
    products: getProducts(state),
    isLoading: isLoading(state),
})
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(ProductsTableContainer)
