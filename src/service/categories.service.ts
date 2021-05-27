import GorestRepository from "../api/gorest.api";
import {map} from "lodash-es";

const loadCategories = async () => {
    const {data: {data = []}} = await GorestRepository.fetchCategories();
    return map(data, categoryApiModel => ({
        id: categoryApiModel.id,
        name: categoryApiModel.name,
        description: categoryApiModel.description
    }))
}
const CategoriesService = {
    loadCategories
}
export default CategoriesService
