import {configureStore} from '@reduxjs/toolkit'
import productsReducer from "./products/products.slice";
import pageReducer from "./page/page.slice";
import categoriesSlice from "./categories/categories.slice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        page: pageReducer,
        categories: categoriesSlice,
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
