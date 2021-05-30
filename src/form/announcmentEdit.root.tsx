import React, { Component, useEffect, useRef } from 'react';
import {connect, ConnectedProps, useDispatch} from "react-redux";
import { getSelectedAnnouncementId } from '../store/page/page.selector';
import { RootState } from '../store/store';
import FormComponent from './container/form.cointainer'
import {getSelectedProduct, } from "../store/products/products.selector";
import {Link, useParams } from 'react-router-dom';
import {isEmpty, toNumber} from "lodash-es";
import { addProduct, editProduct } from '../store/products/products.slice';
import ProductService from '../service/products.service';
import { RouteParamsModel } from '../model/routeParams.model';
import {setSelectedAnnouncement} from "../store/page/page.slice";
import {Product} from "../model/product.model"
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import {ProductApiModel, ProductCategory } from '../api/gorest.api';

const AnnouncementEdit = (props: PropsFromRedux) => {
    const {announcement, selectedAnnouncementId} = props
    let dispatch = useDispatch();
    const {productId} = useParams<RouteParamsModel>();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const handleSubmit = (name:string, description:string, image:string, price:number, categories: ProductCategory[]) =>{
        if(announcement){
            let myAnnouncement: ProductApiModel ={
                id: announcement.id,
                name: name,
                description: description,
                image: image,
                price: String(price),
                categories: categories
            };
            ProductService.updateProduct(announcement.id, myAnnouncement)
                .then(r => {
                    dispatch(addProduct(r))
                    setMessage("Successfully edited!");
                    setOpen(true);
                })
        }
    }
    useEffect(() => {
        let productIdNum = toNumber(productId);
        dispatch(setSelectedAnnouncement(productIdNum))
    }, [])

    useEffect(() => {
        if (isEmpty(announcement) && selectedAnnouncementId) {
            ProductService.loadProduct(selectedAnnouncementId)
                .then(r => dispatch(addProduct(r)))
        }
    }, [selectedAnnouncementId])
    return (
        <>
            <Link to="/">Home</Link>
            <FormComponent buttonLabel="Edit" announcement={props.announcement} handleSubmit={handleSubmit}/>
            <Snackbar open={open} autoHideDuration={6000}>
                <Alert  severity="success">
                    {message}
                </Alert>
            </Snackbar>
        </>

    )
}
const mapStateToProps = (state: RootState) => ({
    announcement: getSelectedProduct(state),
    selectedAnnouncementId: getSelectedAnnouncementId(state),
})
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(AnnouncementEdit);