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

let BASIC_URL = 'https://gorest.co.in/public-api';
const fetchProducts = () => axios.get<ResponsePaginationModel<ProductApiModel>>(BASIC_URL + '/products')
const fetchProduct = (id: number) => axios.get<ResponseModel<ProductApiModel>>(`${BASIC_URL}/products/${id}`)
export default {
    fetchProducts,
    fetchProduct,
}
