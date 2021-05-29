import React from "react";
import {Product} from "../../../model/product.model";
import {Chip} from "@material-ui/core";

interface PropTypes {
    product: Product
}

const PriceLabel = (props: PropTypes) => (
    <Chip label={`${props.product.price} zł`} variant="outlined" color="primary"/>
)
export default PriceLabel
