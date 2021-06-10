import React, {useEffect} from 'react';
import ProductsTableContainer from "./container/productsTable.container";
import {CssBaseline} from "@material-ui/core";
import {setIsLoading as setIsProductsLoading, setProducts} from "../store/products/products.slice";
import ProductService from "../service/products.service";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import CategoriesService from "../service/categories.service";
import {setCategories, setIsLoading as setIsCategoriesLoading} from "../store/categories/categories.slice";
import {isEmpty} from "lodash-es";
import {RootState} from "../store/store";
import {getProducts} from "../store/products/products.selector";
import {getCategories} from "../store/categories/categories.selector";

const AnnouncementList = (props: PropsFromRedux) => {
    const dispatch = useDispatch();

    const loadProducts = () => {
        dispatch(setIsProductsLoading(true))
        ProductService.loadProducts()
            .then(products => {
                dispatch(setProducts(products))
                dispatch(setIsProductsLoading(false))
            })
    }
    const loadCategories = () => {
        dispatch(setIsCategoriesLoading(true))
        CategoriesService.loadCategories()
            .then(categories => {
                dispatch(setCategories(categories));
                dispatch(setIsCategoriesLoading(false))
            })
    }
    useEffect(() => {
        if (isEmpty(props.categories)) {
            loadCategories()
        }
        loadProducts()
    }, [])

    return (
        <div>
            <>
                <CssBaseline/>
                <ProductsTableContainer/>
            </>
        </div>
    );
};
const mapStateToProps = (state: RootState) => ({
    products: getProducts(state),
    categories: getCategories(state),
})
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(AnnouncementList)
