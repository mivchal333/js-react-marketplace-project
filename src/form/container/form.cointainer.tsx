import React, { Component } from 'react';
import { FormControl, InputLabel, Input, FormHelperText, Button, TextField } from '@material-ui/core';
import {Product} from "../../model/product.model"
import {Category} from "../../model/category.model"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { RootState } from '../../store/store';
import {getCategories} from "../../store/categories/categories.selector";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import CategoriesService from "../../service/categories.service";
import {setCategories, setIsLoading as setIsCategoriesLoading} from "../../store/categories/categories.slice";
import {isEmpty} from "lodash-es";
import {store} from "../../store/store"

interface IProps {
    handleSubmit: (name:string, description:string, image:string, price:number, categories: number[]) => void,
    buttonLabel: string,
    categories: Category[],
    announcement?: Product
};

interface IState {
    name: string,
    description: string,
    image: string,
    price: number,
    categories: Category[],
    selectedCategory: Category[],
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
};

const initialState = {
    name: "",
    description: "",
    image: "",
    price: 0,
    categories: [],
    selectedCategory: [],
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
    }

    handleFormSubmit(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        if(!this.validate()){
            return;
        }
        let categories: number[] = [];
        for (let category of this.state.selectedCategory) {
            categories.push(category.id)
        }
        this.props.handleSubmit(this.state.name, this.state.description, this.state.image, this.state.price, categories);
    }

    loadData():void{
        if(this.props.announcement){
            let categories: Category[] = [];
            for (let category of this.props.announcement.categories) {
                let cat = this.state.categories.find(x => x.id == category);
                if(cat != undefined){
                    categories.push(cat);
                }
            }
            this.setState({
                name: this.props.announcement.name,
                description: this.props.announcement.description,
                image: this.props.announcement.image,
                price: this.props.announcement.price,
                selectedCategory: categories,
            })
        }
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (prevProps.announcement !== this.props.announcement) {
            this.loadData();
        }
    }

    componentDidMount() {
        if (isEmpty(this.props.categories)) {
            store.dispatch(setIsCategoriesLoading(true));

            CategoriesService.loadCategories()
                .then(categories => {
                    store.dispatch(setCategories(categories))
                    this.setState({
                        categories: categories
                    })
                    store.dispatch(setIsCategoriesLoading(false));
                })
        }
    }

    validate():boolean{
        this.setState({
            name_error: false,
            description_error: false,
            image_error: false,
            price_error: false,
            category_error: false
        })
        if(!this.state.name)
        {
            this.setState({
                name_error: true,
                name_error_text: "The field cannot be empty!"
            })
            return false;
        }
        if(!this.state.description){
            this.setState({
                description_error: true,
                description_error_text: "The field cannot be empty!"
            })
            return false;
        }
        if(!this.state.image){
            this.setState({
                image_error: true,
                image_error_text: "The field cannot be empty!"
            })
            return false;
        }
        if(!this.state.price){
            this.setState({
                price_error: true,
                price_error_text: "The field cannot be empty!"
            })
            return false;
        }
        if(this.state.price < 0){
            this.setState({
                price_error: true,
                price_error_text: "The value must be greater than zero!"
            })
            return false;
        }
        if(this.state.selectedCategory.length === 0){
            this.setState({
                category_error: true,
                category_error_text: "The field cannot be empty!"
            })
            return false;
        }
        return true;
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = e.currentTarget;
        const n = name as keyof IState;
        // @ts-ignore
        this.setState({
            [n]: value,
        });
    }

    handleAutocomplete(e: Category[]){
        this.setState({
            selectedCategory: e
        })
    }
    render() {
        return (
            <form>
                <FormControl required={true} error={this.state.name_error}>
                    <InputLabel htmlFor="name-input">Name</InputLabel>
                    <Input id="name-input" aria-describedby="name-helper-text" name={"name"} value={this.state.name}  onChange={this.handleChange.bind(this)}/>
                    <FormHelperText id="name-helper-text">{this.state.name_error? this.state.name_error_text : 'Item name' }</FormHelperText>
                </FormControl>

                <FormControl required={true} error={this.state.description_error}>
                    <InputLabel htmlFor="description-input">Description</InputLabel>
                    <Input id="description-input" multiline={true} rowsMin={3} aria-describedby="description-helper-text" value={this.state.description} name={"description"} onChange={this.handleChange.bind(this)}/>
                    <FormHelperText id="description-helper-text">{this.state.description_error? this.state.description_error_text : 'Item description' }</FormHelperText>
                </FormControl>

                <FormControl required={true} error={this.state.image_error}>
                    <InputLabel htmlFor="image-input">Image</InputLabel>
                    <Input id="image-input" aria-describedby="image-helper-text" name={"image"} type={"url"} value={this.state.image} onChange={this.handleChange.bind(this)}/>
                    <FormHelperText id="image-helper-text">{this.state.image_error? this.state.image_error_text : 'Item image' }</FormHelperText>
                </FormControl>

                <FormControl required={true} error={this.state.price_error}>
                    <InputLabel htmlFor="price-input">Price</InputLabel>
                    <Input id="price-input" aria-describedby="price-helper-text" name={"price"} type={"number"} value={this.state.price} onChange={this.handleChange.bind(this)}/>
                    <FormHelperText id="price-helper-text">{this.state.price_error? this.state.price_error_text : 'Item price' }</FormHelperText>
                </FormControl>

                <Autocomplete
                    multiple
                    options={this.props.categories}
                    getOptionLabel={(option) => option.name}
                    value={this.state.selectedCategory}
                    filterSelectedOptions
                    onChange={(event, newValue) => {
                        this.handleAutocomplete(newValue)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={this.state.category_error}
                            helperText = {this.state.category_error? this.state.category_error_text : 'Item categories' }
                            variant="outlined"
                            label="Categories"
                            placeholder="Category"
                        />
                    )}
                />

                <Button variant="contained" color="primary" onClick={this.handleFormSubmit.bind(this)}>{this.props.buttonLabel}</Button>
            </form>
        );
    }
}
const mapStateToProps = (state: RootState) => ({
    categories: getCategories(state),
})
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(FormComponent);