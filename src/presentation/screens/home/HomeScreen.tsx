import { getProductByPage } from "../../../actions/products/get-products-by-page";
import { useQuery } from "@tanstack/react-query";
import { MainLayout } from "../../layouts/MainLayout";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { ProductList } from "../../components/products/ProductList";

export const HomeScreen = () => {
    const { isLoading, data: products = [] } = useQuery({
        queryKey: ['products', 'infinite'],
        staleTime: 1000 * 60 * 60, // 1 Hora
        queryFn: () => getProductByPage(0)
    });

    return (
        <MainLayout
            title="TesloShop - Products"
            subTitle="Aplicacion Administrativa"
        >
            {
                isLoading
                    ? (<FullScreenLoader />)
                    : <ProductList products={products} />
            }
        </MainLayout>
    )
}
