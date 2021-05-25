import {User} from "../../model/user.model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UsersState {
    users: User[]
}

const initialState: UsersState = {
    users: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload
        }
    }
})
export default userSlice.reducer
