import { configureStore } from '@reduxjs/toolkit'
import usersReducer from "./users/users.reducer";

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
