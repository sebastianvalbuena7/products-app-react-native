import { getProductByPage } from "../../../actions/products/get-products-by-page";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { MainLayout } from "../../layouts/MainLayout";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { ProductList } from "../../components/products/ProductList";
import { FAB } from "../../components/ui/FAB";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/StackNavigation";

export const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    // const { isLoading, data: products = [] } = useQuery({
    //     queryKey: ['products', 'infinite'],
    //     staleTime: 1000 * 60 * 60, // 1 Hora
    //     queryFn: () => getProductByPage(0)
    // });

    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['products', 'infinite'],
        staleTime: 1000 * 60 * 60, // 1 Hora
        initialPageParam: 0,
        queryFn: async (params) => await getProductByPage(params.pageParam),
        getNextPageParam: (lastPage, allPages) => allPages.length
    });

    return (
        <>
            <MainLayout
                title="TesloShop - Products"
                subTitle="Aplicacion Administrativa"
            >
                {
                    isLoading
                        ? (<FullScreenLoader />)
                        : (<ProductList
                            products={data?.pages.flat() ?? []}
                            fetchNextPage={fetchNextPage}
                        />)
                }
            </MainLayout>
            
            <FAB 
                style={{ 
                    position: 'absolute', 
                    bottom: 20, 
                    right: 30 
                }} 
                iconName="plus" 
                onPress={() => navigation.navigate('ProductScreen', { productId: 'new' })} />
        </>
    )
}