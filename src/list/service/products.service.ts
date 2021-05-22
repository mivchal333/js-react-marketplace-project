import {Product} from "../../model/product";
import gorestRepository, {ProductApiModel} from '../../api/gorest.api'

const loadProducts = async (): Promise<Product[]> => {
    const {data} = await gorestRepository.fetchProducts()

    return data.data.map((product: ProductApiModel) => ({
        id: product.id,
        description: product.description,
        image: product.image,
        name: product.name,
        price: parseInt(product.price)
    }))
}
export {
    loadProducts
}
