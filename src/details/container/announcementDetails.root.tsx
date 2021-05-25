import React, {useEffect} from 'react'
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {RootState} from "../../store/store";
import {getSelectedProduct} from "../../store/products/products.selector";
import {isEmpty, toNumber} from "lodash-es";
import ProductService from '../../service/products.service'
import {addProduct} from "../../store/products/products.slice";
import {useParams} from 'react-router-dom';
import {RouteParamsModel} from "../../model/routeParams.model";
import {setSelectedAnnouncement} from "../../store/page/page.slice";
import {getSelectedAnnouncementId} from "../../store/page/page.selector";

const AnnouncementDetails = (props: PropsFromRedux) => {
    const {announcement, selectedAnnouncementId} = props
    let dispatch = useDispatch();
    const {productId} = useParams<RouteParamsModel>()

    useEffect(() => {
        let productIdNum = toNumber(productId);
        dispatch(setSelectedAnnouncement(productIdNum))
    }, [])

    useEffect(() => {
        if (isEmpty(announcement) && selectedAnnouncementId) {
            ProductService.loadProduct(selectedAnnouncementId)
                .then(r => dispatch(addProduct(r)))
        }
    }, [selectedAnnouncementId])
    return (
        <div>Details {JSON.stringify(props.announcement)}</div>
    )
}
const mapStateToProps = (state: RootState) => ({
    announcement: getSelectedProduct(state),
    selectedAnnouncementId: getSelectedAnnouncementId(state),
})
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(AnnouncementDetails)
