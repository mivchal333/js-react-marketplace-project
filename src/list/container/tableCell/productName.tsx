import React from "react";
import {Product} from "../../../model/product.model";
import {Link} from "react-router-dom"
import {Typography} from "@material-ui/core";

interface PropTypes {
    product: Product
}

const ProductName = (props: PropTypes) => {
    return (
        <Link to={`/product/${props.product.id}`}>
            <Typography>{props.product.name}</Typography>
        </Link>
    )
}
export default ProductName
