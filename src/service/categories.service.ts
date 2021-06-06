import GorestRepository from "../api/gorest.api";
import {Category} from "../model/category.model";

const loadCategories = async (): Promise<Category[]> => {
    const {data = []} = await GorestRepository.fetchCategories();
    return data;
}
const CategoriesService = {
    loadCategories
}
export default CategoriesService
