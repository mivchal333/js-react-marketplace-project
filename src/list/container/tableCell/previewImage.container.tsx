import React from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setSelectedAnnouncement} from "../../../store/page/page.slice";

interface PropsType {
    src: string,
    id: number,
}

const PreviewImage = (props: PropsType) => {
    let history = useHistory();
    let dispatch = useDispatch();

    const onClick = () => {
        dispatch(setSelectedAnnouncement(props.id))
        history.push(`/announcement/${props.id}`)
    }
    return (
        <img src={props.src} alt="product-image" width={100} height={100} onClick={onClick}/>
    )
}
export default PreviewImage
