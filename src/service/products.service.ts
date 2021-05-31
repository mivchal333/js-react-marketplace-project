import {Product} from "../model/product.model";
import gorestRepository, {CreateProductApiModel, ProductApiModel} from '../api/gorest.api'
import {map} from 'lodash-es'
import { AxiosResponse } from "axios";

const loadProducts = async (): Promise<Product[]> => {
    const {data} = await gorestRepository.fetchProducts()

    return data.data.map(mapToProductAppModel)
}
const mapToProductAppModel = (product: ProductApiModel) => ({
    id: product.id,
    description: product.description,
    image: product.image,
    name: product.name,
    price: parseInt(product.price),
    categories: map(product.categories, c => c.id),
});

const loadProduct = async (id: number): Promise<Product> => {
    const {data} = await gorestRepository.fetchProduct(id)

    return mapToProductAppModel(data.data)
}

const addProduct = async (product: CreateProductApiModel): Promise<Product> =>{
    const data = await gorestRepository.addProduct(product);
    return  mapToProductAppModel(data.data.data);
}

const updateProduct = async (id: number, product: ProductApiModel): Promise<Product> =>{
    const data = await gorestRepository.updateProduct(id, product);
    return  mapToProductAppModel(data.data.data);
}

const deleteProduct = async (id: number): Promise<AxiosResponse> => {
    const request = await gorestRepository.deleteProduct(id)
    return request;
}

const ProductService = {
    loadProducts,
    loadProduct,
    addProduct,
    deleteProduct,
    updateProduct
};
export default ProductService
