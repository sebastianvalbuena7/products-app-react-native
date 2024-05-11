import { tesloApi } from "../../config/api/tesloApi";
import { Gender, Product } from "../../domain/entities/product";
import { TesloProduct } from "../../infrastructure/interfaces/testlo-products.response";
import { ProductMappger } from "../../infrastructure/mapper/product.mapper";

const emptyProduct: Product = {
    id: '',
    title: 'Nuevo Producto',
    price: 0,
    images: [],
    slug: '',
    gender: Gender.Kid,
    sizes: [],
    stock: 0,
    tags: [],
    description: ''
}

export const getProductById = async (id: string): Promise<Product> => {
    if (id === 'new') return emptyProduct;

    try {
        const { data } = await tesloApi.get<TesloProduct>(`/products/${id}`);

        return ProductMappger.tesloProductToEntity(data);
    } catch (error) {
        console.log(error);
        throw new Error(`Error getting product by id: ${id}`);
    }
}