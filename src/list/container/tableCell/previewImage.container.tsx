import React from "react";
import {Link} from "react-router-dom";

interface PropsType {
    src: string,
    id: number,
}

const PreviewImage = (props: PropsType) => {
    return (
        <Link to={`/product/${props.id}`}>
            <img src={props.src} alt="product-image" width={75} height={75}/>
        </Link>
    )
}
export default PreviewImage
