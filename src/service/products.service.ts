import {Product} from "../model/product.model";
import gorestRepository, {ProductApiModel} from '../api/gorest.api'
import {map} from 'lodash-es'

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

const ProductService = {
    loadProducts,
    loadProduct
};
export default ProductService
