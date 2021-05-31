import React from 'react';
import {useDispatch} from "react-redux";
import FormComponent from './container/form.cointainer'
import {addProduct} from '../store/products/products.slice';
import ProductService from '../service/products.service';
import {CssBaseline, Snackbar} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {CreateProductApiModel, ProductCategory} from '../api/gorest.api';
import {useHistory} from "react-router-dom";

const AnnouncmentAdd = () => {
    let dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    let history = useHistory();

    const handleSubmit = (name: string, description: string, image: string, price: number, categories: ProductCategory[]) => {
        let myAnnouncement: CreateProductApiModel = {
            name: name,
            description: description,
            image: image,
            price: String(price),
            categories: categories,
            status: true
        };
        ProductService.addProduct(myAnnouncement)
            .then(r => {
                if (r.id !== undefined) {
                    dispatch(addProduct(r));
                    setMessage("Successfully added!");
                    setOpen(true);
                }
            })
    }

    return (
        <>
            <CssBaseline/>
            <FormComponent
                buttonLabel="Add"
                handleSubmit={handleSubmit}
                onCancel={() => history.push('/')}
            />
            <Snackbar open={open} autoHideDuration={6000}>
                <Alert severity="success">
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}
export default AnnouncmentAdd
