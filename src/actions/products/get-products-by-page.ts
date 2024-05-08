import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";
import { TesloProduct } from "../../infrastructure/interfaces/testlo-products.response";
import { ProductMappger } from "../../infrastructure/mapper/product.mapper";

export const getProductByPage = async (page: number, limit: number = 20): Promise<Product[]> => {
    try {
        const { data } = await tesloApi.get<TesloProduct[]>(`/products?offset=${page * 10}&limit=${limit}`);

        const products = data.map(ProductMappger.tesloProductToEntity);

        return products;
    } catch (error) {
        console.log(error);
        throw new Error(`Ha ocurrido un error ${error}`);
    }
}