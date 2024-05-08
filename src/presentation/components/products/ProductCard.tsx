import { Product } from "../../../domain/entities/product"
import { Image } from "react-native";

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    return (
        <Image
            source={{ uri: product.images[0] }}
            style={{ width: 250, height: 250 }}
        />
    )
}
