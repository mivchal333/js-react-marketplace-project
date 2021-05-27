import React from "react";
import {CircularProgress, TextField} from "@material-ui/core";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {RootState} from "../../store/store";
import {getCategories, getSelectedCategoryId, isLoading} from "../../store/categories/categories.selector";
import {setSelectedCategoryId} from "../../store/categories/categories.slice";
import {toNumber, toString} from "lodash-es";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Value} from "@material-ui/lab/useAutocomplete/useAutocomplete";
import {Category} from "../../model/category.model";
import {FilterValue, IdType} from "react-table";
import {Product} from "../../model/product.model";

interface PropTypes extends PropsFromRedux {
    setFilter: (columnId: IdType<Product>, updater: ((filterValue: FilterValue) => FilterValue) | FilterValue) => void
}

const CategoryField = (props: PropTypes) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const onChange = (event: React.ChangeEvent<{}>, value: Value<Category>) => {
        const selectedId = value ? toNumber(value.id) : undefined
        dispatch(setSelectedCategoryId(selectedId))
        props.setFilter("categories", toString(selectedId))
    }
    if (props.isLoading) {
        return <CircularProgress/>
    }
    return (
        <Autocomplete
            onChange={onChange}
            options={props.categories}
            renderInput={(params) => <TextField {...params} label="Category" variant="outlined"/>}
            getOptionLabel={option => option.name}
            style={{
                margin: "1em",
                width: "30em"
            }}
        />
    )
}
const mapStateToProps = (state: RootState) => ({
    categories: getCategories(state),
    selectedCategory: getSelectedCategoryId(state),
    isLoading: isLoading(state)
})
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(CategoryField)

