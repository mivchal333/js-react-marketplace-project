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
export interface ResponseModel<T> {
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

let BASIC_URL = 'https://gorest.co.in/public-api';
const fetchProducts = () => axios.get<ResponseModel<ProductApiModel>>(BASIC_URL + '/products')
export default {
    fetchProducts
}
