import React from "react";

interface PropsType {
    src: string,
}

const PreviewImage = (props: PropsType) => (
    <img src={props.src} alt="product-image" width={100} height={100}/>
)
export default PreviewImage
