import React from 'react';
import {useDispatch} from "react-redux";
import FormComponent from './container/form.cointainer'
import {addProduct} from '../store/products/products.slice';
import ProductService from '../service/products.service';
import {CssBaseline, Snackbar} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {useHistory} from "react-router-dom";
import {CreateProductPayload} from "../model/product.model";

const AnnouncmentAdd = () => {
    let dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    let history = useHistory();

    const handleSubmit = (name: string, description: string, image: string, price: number, categories: number[]) => {
        let myAnnouncement: CreateProductPayload = {
            name: name,
            description: description,
            image: image,
            price: price,
            categories: categories,
        };
        ProductService.addProduct(myAnnouncement)
            .then(r => {
                if (r.id !== undefined) {
                    dispatch(addProduct(r));
                    setMessage("Successfully added!");
                    setOpen(true);
                    history.push(`/product/${r.id}`)
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
