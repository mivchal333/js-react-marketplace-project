import React from "react";
import {Link} from "react-router-dom";

interface PropsType {
    src: string,
    id: number,
}

const PreviewImage = (props: PropsType) => {
    return (
        <Link to={`/product/${props.id}`}>
            <img src={props.src} alt="product-image" width={100} height={100}/>
        </Link>
    )
}
export default PreviewImage
