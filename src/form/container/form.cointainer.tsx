import React, {Component} from 'react';
import {Button, Card, FormControl, FormHelperText, Grid, Input, InputLabel, TextField} from '@material-ui/core';
import {Product} from "../../model/product.model"
import {Category} from "../../model/category.model"
import Autocomplete from '@material-ui/lab/Autocomplete';
import {RootState, store} from '../../store/store';
import {getCategories, isLoading} from "../../store/categories/categories.selector";
import {connect, ConnectedProps} from "react-redux";
import CategoriesService from "../../service/categories.service";
import {setCategories, setIsLoading as setIsCategoriesLoading} from "../../store/categories/categories.slice";
import {find, isEmpty, map} from "lodash-es";
import Container from '@material-ui/core/Container';
import PhotoField from "./photoField.container";

interface IProps extends PropsFromRedux {
    handleSubmit: (name: string, description: string, image: string, price: number, categories: number[]) => void,
    buttonLabel: string,
    initialData?: Product,
    onCancel: () => void,
}

interface IState {
    name: string,
    description: string,
    image: string,
    price: number,
    categories: Category[],
    name_error: boolean,
    name_error_text: string,
    description_error: boolean,
    description_error_text: string,
    image_error: boolean,
    image_error_text: string,
    price_error: boolean,
    price_error_text: string,
    category_error: boolean,
    category_error_text: string
}

const initialState = {
    name: "",
    description: "",
    image: "",
    price: 0,
    categories: [],
    selectedCategories: [],
    name_error: false,
    name_error_text: "",
    description_error: false,
    description_error_text: "",
    image_error: false,
    image_error_text: "",
    price_error: false,
    price_error_text: "",
    category_error: false,
    category_error_text: "",
}

class FormComponent extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = initialState;
        this.onImageChange = this.onImageChange.bind(this);
    }

    handleFormSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!this.validate()) {
            return;
        }
        const categoriesIds = map(this.state.categories, category => category.id)
        this.props.handleSubmit(this.state.name, this.state.description, this.state.image, this.state.price, categoriesIds);
    }

    componentDidMount() {
        const {initialData} = this.props
        if (initialData) {
            this.setState({
                name: initialData.name,
                description: initialData.description,
                image: initialData.image,
                price: initialData.price,
            })
        }
        this.initCategories()
    }

    async initCategories() {
        if (isEmpty(this.props.categories)) {
            store.dispatch(setIsCategoriesLoading(true));
            const categories = await CategoriesService.loadCategories()
            await store.dispatch(setCategories(categories))
            store.dispatch(setIsCategoriesLoading(false));
        }
        const selectedCategories = map(this.props.initialData?.categories,
            categoryId => find(this.props.categories, {id: categoryId}))
            .filter(category => category)
        // @ts-ignore
        this.setState({categories: selectedCategories})
    }

    validate(): boolean {
        this.setState({
            name_error: false,
            description_error: false,
            image_error: false,
            price_error: false,
            category_error: false
        })
        if (!this.state.name) {
            this.setState({
                name_error: true,
                name_error_text: "The field cannot be empty!"
            })
            return false;
        }
        if (!this.state.description) {
            this.setState({
                description_error: true,
                description_error_text: "The field cannot be empty!"
            })
            return false;
        }
        if (!this.state.image) {
            this.setState({
                image_error: true,
                image_error_text: "The field cannot be empty!"
            })
            return false;
        }
        if (!this.state.price) {
            this.setState({
                price_error: true,
                price_error_text: "The field cannot be empty!"
            })
            return false;
        }
        if (this.state.price < 0) {
            this.setState({
                price_error: true,
                price_error_text: "The value must be greater than zero!"
            })
            return false;
        }
        if (this.state.categories.length === 0) {
            this.setState({
                category_error: true,
                category_error_text: "The field cannot be empty!"
            })
            return false;
        }
        return true;
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.currentTarget;
        const n = name as keyof IState;
        // @ts-ignore
        this.setState({
            [n]: value,
        });
    }

    handleAutocomplete(e: Category[]) {
        this.setState({
            categories: e
        })
    }

    onImageChange(imageSrc: string) {
        this.setState({
            image: imageSrc
        })
    }

    render() {
        return (
            <Container component="main">
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    alignItems="center"
                >
                    <Grid item xs={6}>
                        <Card style={{padding: '2em'}}>
                            <form>
                                <FormControl fullWidth required={true} error={this.state.image_error} margin={'normal'}>
                                    <PhotoField
                                        onChange={this.onImageChange}
                                        value={this.state.image}
                                        productName={this.state.name}
                                    />
                                </FormControl>

                                <FormControl fullWidth required={true} error={this.state.name_error} margin={'normal'}>
                                    <InputLabel htmlFor="name-input">Name</InputLabel>
                                    <Input id="name-input" aria-describedby="name-helper-text" name={"name"}
                                           value={this.state.name} onChange={this.handleChange.bind(this)}/>
                                    <FormHelperText
                                        id="name-helper-text">{this.state.name_error ? this.state.name_error_text : 'Item name'}</FormHelperText>
                                </FormControl>

                                <FormControl fullWidth required={true} error={this.state.description_error}
                                             margin={'normal'}>
                                    <InputLabel htmlFor="description-input">Description</InputLabel>
                                    <Input id="description-input" multiline={true} rowsMin={3}
                                           aria-describedby="description-helper-text" value={this.state.description}
                                           name={"description"} onChange={this.handleChange.bind(this)}/>
                                    <FormHelperText
                                        id="description-helper-text">{this.state.description_error ? this.state.description_error_text : 'Item description'}</FormHelperText>
                                </FormControl>
                                <FormControl fullWidth required={true} error={this.state.price_error} margin={'normal'}>
                                    <InputLabel htmlFor="price-input">Price</InputLabel>
                                    <Input id="price-input" aria-describedby="price-helper-text" name={"price"}
                                           type={"number"}
                                           value={this.state.price} onChange={this.handleChange.bind(this)}/>
                                    <FormHelperText
                                        id="price-helper-text">{this.state.price_error ? this.state.price_error_text : 'Item price'}</FormHelperText>
                                </FormControl>

                                <Autocomplete fullWidth
                                              multiple
                                              options={this.props.categories}
                                              getOptionLabel={(option) => option.name}
                                              value={this.state.categories}
                                              filterSelectedOptions
                                              onChange={(event, newValue) => {
                                                  this.handleAutocomplete(newValue)
                                              }}
                                              renderInput={(params) => (
                                                  <TextField
                                                      {...params}
                                                      error={this.state.category_error}
                                                      helperText={this.state.category_error ? this.state.category_error_text : 'Item categories'}
                                                      variant="outlined"
                                                      label="Categories"
                                                      placeholder="Category"
                                                  />
                                              )}
                                />
                                <Button variant="contained" color="primary"
                                        onClick={this.handleFormSubmit.bind(this)}>{this.props.buttonLabel}</Button>
                                <Button variant="contained" onClick={this.props.onCancel}>Cancel</Button>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    categories: getCategories(state),
    isCategoriesLoading: isLoading(state)
})
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(FormComponent);
