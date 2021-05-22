import {bindActionCreators, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "../../model/product";

interface ProductsState {
    products: Product[]
    isLoading: boolean,
}

const initialState: ProductsState = {
    products: [],
    isLoading: false
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const {setProducts, setIsLoading} = productSlice.actions

export default productSlice.reducer
