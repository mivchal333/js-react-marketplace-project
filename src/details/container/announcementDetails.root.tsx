import React, {useEffect} from 'react'
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {RootState} from "../../store/store";
import {getSelectedProduct} from "../../store/products/products.selector";
import {isEmpty, toNumber} from "lodash-es";
import ProductService from '../../service/products.service'
import {addProduct, deleteProduct} from "../../store/products/products.slice";
import {Link, useParams} from 'react-router-dom';
import {RouteParamsModel} from "../../model/routeParams.model";
import {setSelectedAnnouncement} from "../../store/page/page.slice";
import {getSelectedAnnouncementId} from "../../store/page/page.selector";
import {Button, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';
import DrawerContainer from '../../list/container/drawer/drawer.container';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { getCategories } from '../../store/categories/categories.selector';
import { Category } from '../../model/category.model';
import {setCategories, setIsLoading as setIsCategoriesLoading} from "../../store/categories/categories.slice";
import CategoriesService from '../../service/categories.service';

const AnnouncementDetails = (props: PropsFromRedux) => {
    const {announcement, selectedAnnouncementId, categories} = props;
    const [open, setOpen] = React.useState(false);
    let dispatch = useDispatch();
    let productCategories: Category[] = [];
    const {productId} = useParams<RouteParamsModel>()

    useEffect(() => {
        let productIdNum = toNumber(productId);
        dispatch(setSelectedAnnouncement(productIdNum))
    }, [])

    const loadProductCategories = () =>{
        if(categories && announcement){
            productCategories = []
            for (let category of announcement.categories) {
                let cat =categories.find(x => x.id == category);
                if(cat != undefined){
                    productCategories.push(cat);
                    console.log(cat)
                }
            }
            console.log(productCategories)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() =>{
        loadProductCategories();
    }, [categories])

    useEffect(() => {
        if (isEmpty(announcement) && selectedAnnouncementId) {
            ProductService.loadProduct(selectedAnnouncementId)
                .then(r => dispatch(addProduct(r)))
        }
        if(isEmpty(categories)){
            dispatch(setIsCategoriesLoading(true));

            CategoriesService.loadCategories()
                .then(categories => {
                    dispatch(setCategories(categories))
                    dispatch(setIsCategoriesLoading(false));
                })
        }
        loadProductCategories();
    }, [selectedAnnouncementId])

    function handleDelete() {
        setOpen(false);
        if(selectedAnnouncementId){
            ProductService.deleteProduct(selectedAnnouncementId)
                .then(r => {
                    if(r.status == 200){
                        //TODO redirect
                        console.log("ok");
                        dispatch(deleteProduct(selectedAnnouncementId));
                    }})
        }
    }
    return (
        <DrawerContainer>
            <CssBaseline/>
            <div style={{ padding: 20 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <h1>{announcement?.name}</h1>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={announcement?.image} alt={announcement?.name} />
                    </Grid>
                    <Grid item xs={6}>
                        <Link to={'/edit/' + announcement?.id}>
                            <EditIcon/>
                        </Link>
                        <DeleteIcon onClick={handleClickOpen}/>
                        <h3>Price:</h3>
                        <p>{announcement?.price} zł</p>
                        <h3>Categories:</h3>
                        <ul>
                            {productCategories.map((item,i) =>
                                <li key={i}>{item.name}</li>
                            )}
                        </ul>
                    </Grid>
                    <Grid item xs={12}>
                        <h1>Description:</h1>
                        <p>{announcement?.description}</p>
                    </Grid>
                </Grid>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete item?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the selected item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </DrawerContainer>
    )
}
const mapStateToProps = (state: RootState) => ({
    announcement: getSelectedProduct(state),
    selectedAnnouncementId: getSelectedAnnouncementId(state),
    categories: getCategories(state),
})
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(AnnouncementDetails)
