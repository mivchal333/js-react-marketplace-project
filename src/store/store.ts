import { configureStore } from '@reduxjs/toolkit'
import usersReducer from "./users/users.slice";
import productsReducer from "./products/products.slice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        products: productsReducer
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
