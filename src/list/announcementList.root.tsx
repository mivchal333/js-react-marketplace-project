import React, {useEffect} from 'react';
import ProductsTableContainer from "./container/productsTable.container";
import {CssBaseline} from "@material-ui/core";
import DrawerContainer from "./container/drawer/drawer.container";
import {setIsLoading as setIsProductsLoading, setProducts} from "../store/products/products.slice";
import ProductService from "../service/products.service";
import {useDispatch} from "react-redux";
import CategoriesService from "../service/categories.service";
import {setCategories, setIsLoading as setIsCategoriesLoading} from "../store/categories/categories.slice";

const AnnouncementList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIsProductsLoading(true))
        dispatch(setIsCategoriesLoading(true))

        ProductService.loadProducts()
            .then(products => {
                dispatch(setProducts(products))
                dispatch(setIsProductsLoading(false))
            })
        CategoriesService.loadCategories()
            .then(categories => {
                dispatch(setCategories(categories));
                dispatch(setIsCategoriesLoading(false))
            })
    }, [])

    return (
        <div>
            <DrawerContainer>
                <CssBaseline/>
                <ProductsTableContainer/>
            </DrawerContainer>
        </div>
    );
};
export default AnnouncementList
