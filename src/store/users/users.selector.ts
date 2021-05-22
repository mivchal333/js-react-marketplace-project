import {RootState} from "../store";

const getUsers = (state: RootState) => state.users.users

export {
    getUsers
}
