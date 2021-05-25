import {RootState} from "../store";
import {find} from "lodash-es";

const getProducts = (state: RootState) => state.products.products
const isLoading = (state: RootState) => state.products.isLoading
const getSelectedProduct = (state: RootState) => find(state.products.products, product => product.id === state.page.selectedAnnouncementId)

export {
    getProducts,
    isLoading,
    getSelectedProduct
}
