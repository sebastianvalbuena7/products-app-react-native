import { FlatList, Image } from "react-native";
import { FadeInImage } from "../ui/FadeInImage";

interface Props {
    images: string[];
}

export const ProductImages = ({ images }: Props) => {
    return (
        <>
            {
                (images.length === 0)
                    ? <Image
                        style={{ width: 300, height: 300, marginHorizontal: 7 }}
                        source={require('../../../assets/no-product-image.png')}
                    />
                    : <FlatList
                        data={images}
                        horizontal
                        keyExtractor={(item) => item}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <FadeInImage
                            uri={item}
                            style={{
                                width: 300,
                                height: 300,
                                marginHorizontal: 7
                            }}
                        />
                        }
                    />
            }
        </>
    )
}
