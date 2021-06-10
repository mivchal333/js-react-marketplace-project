export interface Product {
    id: number,
    name: string,
    description: string,
    image: string,
    price: number,
    categories: number[],
    updateDate: number,
}

export interface CreateProductPayload {
    name: string,
    description: string,
    image: string,
    price: number,
    categories: number[],
    updateDate: number,
}
