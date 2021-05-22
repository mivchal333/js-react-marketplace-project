import React, {useEffect} from 'react';
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {RootState} from "../../store/store";
import {getProducts, isLoading} from "../../store/products/products.selector";
import {loadProducts} from "../service/products.service";
import {setIsLoading, setProducts} from "../../store/products/products.slice";

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

    return (
        <div>{props.products.length}</div>
    );
}

const mapStateToProps = (state: RootState) => ({
    products: getProducts(state),
    isLoading: isLoading(state),
})
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(ProductsTableContainer)
