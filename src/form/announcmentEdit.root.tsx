import React, {useEffect} from 'react';
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {RootState} from '../store/store';
import FormComponent from './container/form.cointainer'
import {getSelectedProduct, isLoading,} from "../store/products/products.selector";
import {useHistory, useParams} from 'react-router-dom';
import {isEmpty, toNumber} from "lodash-es";
import {addProduct, setIsLoading as setIsProductsLoading, setProducts} from '../store/products/products.slice';
import ProductService from '../service/products.service';
import {RouteParamsModel} from '../model/routeParams.model';
import {Alert, Skeleton} from '@material-ui/lab';
import {CssBaseline, Snackbar} from '@material-ui/core';
import {ProductApiModel, ProductCategory} from '../api/gorest.api';
import {setSelectedProductId} from "../store/page/page.slice";

const AnnouncementEdit = (props: PropsFromRedux) => {
    const {product, isLoading} = props
    let dispatch = useDispatch();
    const {productId} = useParams<RouteParamsModel>();
    let productIdRouteParam = toNumber(productId);
    let history = useHistory();

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const handleSubmit = (name: string, description: string, image: string, price: number, categories: ProductCategory[]) => {
        let myAnnouncement: ProductApiModel = {
            id: productIdRouteParam,
            name: name,
            description: description,
            image: image,
            price: String(price),
            categories: categories
        };
        ProductService.updateProduct(productIdRouteParam, myAnnouncement)
            .then(r => {
                if (r.id !== undefined) {
                    dispatch(addProduct(r))
                    setMessage("Successfully edited!");
                    setOpen(true);
                    history.push(`/product/${productId}`)
                } else {
                    console.error(r)
                }
            })
    }

    useEffect(() => {
        dispatch(setSelectedProductId(productIdRouteParam))
        if (isEmpty(product)) {
            dispatch(setIsProductsLoading(true))
            ProductService.loadProducts()
                .then(products => {
                    dispatch(setProducts(products))
                    dispatch(setIsProductsLoading(false))
                })
        }
    }, [])

    if (isLoading || !product) {
        return <Skeleton variant="rect" width={210} height={118}/>
    } else {
        return (
            <>
                <CssBaseline/>
                <FormComponent
                    buttonLabel="Edit"
                    initialData={product} handleSubmit={handleSubmit}
                    onCancel={() => history.push(`/product/${product.id}`)}
                />
                <Snackbar open={open} autoHideDuration={6000}>
                    <Alert severity="success">
                        {message}
                    </Alert>
                </Snackbar>
            </>

        )
    }

}
const mapStateToProps = (state: RootState) => ({
    product: getSelectedProduct(state),
    isLoading: isLoading(state),
})
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(AnnouncementEdit);
