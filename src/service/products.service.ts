import {CreateProductPayload, Product} from "../model/product.model";
import gorestRepository from '../api/gorest.api'
import {AxiosResponse} from "axios";

const loadProducts = async (): Promise<Product[]> => {
    const {data} = await gorestRepository.fetchProducts()

    return data
}

const loadProduct = async (id: number): Promise<Product> => {
    const {data} = await gorestRepository.fetchProduct(id)

    return data
}

const addProduct = async (product: CreateProductPayload): Promise<Product> => {
    const data = await gorestRepository.addProduct(product);
    return data.data;
}

const updateProduct = async (id: number, product: Product): Promise<Product> => {
    const data = await gorestRepository.updateProduct(id, product);
    return data.data;
}

const deleteProduct = async (id: number): Promise<AxiosResponse> => {
    return await gorestRepository.deleteProduct(id);
}

const ProductService = {
    loadProducts,
    loadProduct,
    addProduct,
    deleteProduct,
    updateProduct
};
export default ProductService
