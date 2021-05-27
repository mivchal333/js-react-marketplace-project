import {RootState} from "../store";

const getCategories = (state: RootState) => state.categories.categories
const isLoading = (state: RootState) => state.categories.isLoading
const getSelectedCategoryId = (state: RootState) => state.categories.selectedId

export {
    getCategories,
    isLoading,
    getSelectedCategoryId
}
