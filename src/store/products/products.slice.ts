import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "../../model/product.model";

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
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products = [...state.products, action.payload]
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        editProduct: (state, action: PayloadAction<Product>) => {
            state.products = [...state.products.filter(item => item.id !== action.payload.id), action.payload]
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(item => item.id !== action.payload)
        }

    }
})

export const {setProducts, setIsLoading, addProduct, editProduct, deleteProduct} = productSlice.actions

export default productSlice.reducer
