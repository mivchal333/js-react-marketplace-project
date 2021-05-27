import React from "react";
import {Product} from "../../../model/product.model";
import {Typography} from "@material-ui/core";

interface PropTypes {
    product: Product
}

const PriceLabel = (props: PropTypes) => (
    <Typography>{`${props.product.price} zł`}</Typography>
)
export default PriceLabel
