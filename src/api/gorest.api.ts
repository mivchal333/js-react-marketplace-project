import axios from "axios";

interface ProductCategory {
    id: number,
    name: string,
}

export interface ProductApiModel {
    id: number,
    name: string,
    description: string,
    image: string,
    price: string,
    categories: ProductCategory[],
}

interface ResponsePaginationModel<T> {
    code: number,
    meta: {
        pagination: {
            total: number,
            pages: number,
            page: number,
            limit: number
        }
    }
    data: T[]
}

interface ResponseModel<T> {
    code: number,
    data: T
}

interface CategoryApiModel {
    id: number,
    name: string,
    description: string,
    status: boolean,
}

let BASIC_URL = 'https://gorest.co.in/public-api';
const API_KEY = process.env.REACT_APP_GOREST_API_KEY;

const gorestInstance = axios.create({
    baseURL: BASIC_URL,
    headers: {
        Authorization: `Bearer ${API_KEY}`
    }
});

const fetchProducts = () => gorestInstance.get<ResponsePaginationModel<ProductApiModel>>('/products')

const fetchProduct = (id: number) => gorestInstance.get<ResponseModel<ProductApiModel>>(`/products /${id}`)

const fetchCategories = () => gorestInstance.get<ResponsePaginationModel<CategoryApiModel>>('/categories')

const GorestRepository = {
    fetchProducts,
    fetchProduct,
    fetchCategories
};
export default GorestRepository
