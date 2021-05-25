import {configureStore} from '@reduxjs/toolkit'
import usersReducer from "./users/users.slice";
import productsReducer from "./products/products.slice";
import pageReducer from "./page/page.slice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        products: productsReducer,
        page: pageReducer
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
