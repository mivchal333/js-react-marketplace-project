import {RootState} from "../store";

const getProducts = (state: RootState) => state.products.products
const isLoading = (state: RootState) => state.products.isLoading

export {
    getProducts,
    isLoading
}
