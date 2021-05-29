import React from "react";
import {Product} from "../../../model/product.model";
import {Link} from "react-router-dom"
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

interface PropTypes {
    product: Product
}


const useStyles = makeStyles((theme) => ({
    name: {
        color: 'inherit',
        textDecoration: 'inherit'
    },
}))

const ProductName = (props: PropTypes) => {
    const classes = useStyles();

    return (
        <Typography
            className={classes.name}
            variant='h6'
            component={Link}
            to={`/product/${props.product.id}`}>
            {props.product.name}
        </Typography>
    )
}
export default ProductName
