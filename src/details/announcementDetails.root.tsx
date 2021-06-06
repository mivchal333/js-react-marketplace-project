import React, {useEffect} from 'react'
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {RootState} from "../store/store";
import {getSelectedProduct} from "../store/products/products.selector";
import {isEmpty, toNumber} from "lodash-es";
import ProductService from '../service/products.service'
import {addProduct, deleteProduct} from "../store/products/products.slice";
import {Link, useHistory, useParams} from 'react-router-dom';
import {RouteParamsModel} from "../model/routeParams.model";
import {setSelectedProductId} from "../store/page/page.slice";
import {getSelectedAnnouncementId} from "../store/page/page.selector";
import {
    Button,
    ButtonGroup,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {getCategories} from '../store/categories/categories.selector';
import {Category} from '../model/category.model';
import {setCategories, setIsLoading as setIsCategoriesLoading} from "../store/categories/categories.slice";
import CategoriesService from '../service/categories.service';
import PriceLabel from "../list/container/tableCell/priceLabel";
import ProductNotFound from "./component/productNotFound.component";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const AnnouncementDetails = (props: PropsFromRedux) => {
    const {product, selectedAnnouncementId, categories} = props;
    const [open, setOpen] = React.useState(false);
    let initCategories: Category[] = []
    const [productCategories, setProductCategories] = React.useState(initCategories);
    let dispatch = useDispatch();
    const {productId} = useParams<RouteParamsModel>()
    let history = useHistory();

    useEffect(() => {
        let productIdNum = toNumber(productId);
        dispatch(setSelectedProductId(productIdNum))
    }, [])

    const loadProductCategories = () => {
        if (categories && product) {
            let selectedCategories: Category[] = [];
            for (let category of product.categories) {
                let cat = categories.find(x => x.id == category);
                if (cat != undefined) {
                    selectedCategories.push(cat)
                }
            }
            setProductCategories(selectedCategories);
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        loadProductCategories();
    }, [categories])

    useEffect(() => {
        if (isEmpty(product) && selectedAnnouncementId) {
            ProductService.loadProduct(selectedAnnouncementId)
                .then(r => dispatch(addProduct(r)))
        }
        if (isEmpty(categories)) {
            dispatch(setIsCategoriesLoading(true));

            CategoriesService.loadCategories()
                .then(categories => {
                    console.log(categories)
                    dispatch(setCategories(categories))
                    dispatch(setIsCategoriesLoading(false));
                })
        }
        loadProductCategories();
    }, [selectedAnnouncementId])

    function handleDelete() {
        setOpen(false);
        if (selectedAnnouncementId) {
            ProductService.deleteProduct(selectedAnnouncementId)
                .then(r => {
                    if (r.status == 200) {
                        dispatch(deleteProduct(selectedAnnouncementId));
                        history.push(`/`)
                    }
                })
        }
    }

    if (!product) {
        return <ProductNotFound/>
    }
    return (
        <>
            <CssBaseline/>
            <div style={{padding: 20}}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <h1><Button startIcon={<ArrowBackIcon/>} onClick={() => history.push('/')}/> {product?.name}
                        </h1>
                    </Grid>
                    <Grid item xs={6}>
                        <img src={product?.image} alt={product?.name}/>
                    </Grid>
                    <Grid item xs={6}>
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <Button component={Link} to={'/edit/' + product?.id} startIcon={<EditIcon/>}>Edit</Button>
                            <Button onClick={handleClickOpen} startIcon={<DeleteIcon/>}>Delete</Button>
                        </ButtonGroup>
                        <h3>Price</h3>
                        <PriceLabel product={product}/>
                        <h3>Categories:</h3>
                        <ul>
                            {productCategories.map((item, i) =>
                                <li key={i}>{item.name}</li>
                            )}
                        </ul>
                    </Grid>
                    <Grid item xs={12}>
                        <h1>Description:</h1>
                        <p>{product?.description}</p>
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
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon/>}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
const mapStateToProps = (state: RootState) => ({
    product: getSelectedProduct(state),
    selectedAnnouncementId: getSelectedAnnouncementId(state),
    categories: getCategories(state),
})
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(AnnouncementDetails)
