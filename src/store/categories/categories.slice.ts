import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category} from "../../model/category.model";

interface ProductsState {
    categories: Category[]
    isLoading: boolean,
    selectedId?: number
}

const initialState: ProductsState = {
    categories: [],
    isLoading: false,
    selectedId: undefined,
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setSelectedCategoryId: (state, action: PayloadAction<number | undefined>) => {
            state.selectedId = action.payload
        }

    }
})

export const {setCategories, setIsLoading, setSelectedCategoryId} = categorySlice.actions

export default categorySlice.reducer
