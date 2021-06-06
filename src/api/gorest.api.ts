import axios from "axios";
import {CreateProductPayload, Product} from "../model/product.model";
import {Category} from "../model/category.model";

let BASIC_URL = 'http://localhost:8001';

const gorestInstance = axios.create({
    baseURL: BASIC_URL,
});

const fetchProducts = () => gorestInstance.get <Product[]>('/products')

const fetchProduct = (id: number) => gorestInstance.get<Product>(`/products/${id}`)

const addProduct = (product: CreateProductPayload) => gorestInstance.post<Product>(`/products`, product)

const updateProduct = (id: number, product: Product) => gorestInstance.put(`/products/${id}`, product)

const deleteProduct = (id: number) => gorestInstance.delete(`/products/${id}`)

const fetchCategories = () => gorestInstance.get<Category[]>('/categories')

const GorestRepository = {
    fetchProducts,
    fetchProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchCategories
};
export default GorestRepository
