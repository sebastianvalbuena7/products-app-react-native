import { useRef } from "react"
import { ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Layout, Input, ButtonGroup, Button, useTheme, Text } from "@ui-kitten/components"
import { Formik } from "formik"
import { MainLayout } from "../../layouts/MainLayout"
import { RootStackParams } from "../../navigation/StackNavigation"
import { Product } from '../../../domain/entities/product';
import { MyIcon } from "../../components/ui/MyIcon"
import { updateCreateProduct, getProductById } from "../../../actions/products"
import { ProductImages } from "../../components/products/ProductImages"
import { genders, sizes } from "../../../config/constants/constants"
import { CameraAdapter } from "../../../config/adapters/camera-adapter"

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { };

export const ProductScreen = ({ route }: Props) => {
    const productIdRef = useRef(route.params.productId);
    const theme = useTheme();
    const queryClient = useQueryClient();

    // useMutation
    const mutation = useMutation({
        mutationFn: (data: Product) => updateCreateProduct({ ...data, id: productIdRef.current }),
        onSuccess(data: Product) {
            productIdRef.current = data.id;
            queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
            queryClient.invalidateQueries({ queryKey: ['product', data.id] })
        }
    });

    // useQuery
    const { data: product } = useQuery({
        // staleTime: 1000,
        queryFn: () => getProductById(productIdRef.current),
        queryKey: ['product', productIdRef.current]
    });

    if (!product) return (<MainLayout title="Cargando..." />);

    return (
        <Formik
            initialValues={product}
            onSubmit={values => mutation.mutate(values)}
        >
            {
                ({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
                    <MainLayout
                        title={values.title}
                        subTitle={`Precio: ${values.price}`}
                        rightAction={async () => {
                            // !: Abrir camara y tomar fotos
                            // const photos = await CameraAdapter.takePicture();
                            const photos = await CameraAdapter.getPicturesFromLibraty();
                            setFieldValue('images', [...values.images, ...photos])
                        }}
                        rightActionIcon="camera-outline"
                    >
                        <ScrollView style={{ flex: 1 }}>
                            {/* Imagenes del producto */}
                            <Layout style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <ProductImages images={values.images} />
                            </Layout>

                            {/* Formulario */}
                            <Layout style={{ marginHorizontal: 10 }}>
                                <Input
                                    label="Titulo"
                                    value={values.title}
                                    style={{ marginVertical: 5 }}
                                    onChangeText={handleChange('title')}
                                />

                                <Input
                                    label="Slug"
                                    value={values.slug}
                                    style={{ marginVertical: 5 }}
                                    onChangeText={handleChange('slug')}
                                />

                                <Input
                                    label="Descripcion"
                                    value={values.description}
                                    style={{ marginVertical: 5 }}
                                    numberOfLines={5}
                                    multiline
                                    onChangeText={handleChange('description')}
                                />
                            </Layout>

                            {/* Precio e Inventario */}
                            <Layout style={{ marginHorizontal: 15, flexDirection: 'row', gap: 10, marginVertical: 5 }}>
                                <Input
                                    label="Precio"
                                    value={values.price.toString()}
                                    style={{ flex: 1 }}
                                    onChangeText={handleChange('price')}
                                    keyboardType="numeric"
                                />

                                <Input
                                    label="Inventario"
                                    value={values.stock.toString()}
                                    style={{ flex: 1 }}
                                    onChangeText={handleChange('stock')}
                                    keyboardType="numeric"
                                />
                            </Layout>

                            {/* Selectores */}
                            <ButtonGroup
                                style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }} size="small"
                                appearance="outline"
                            >
                                {
                                    sizes.map(size => (
                                        <Button
                                            onPress={() => setFieldValue(
                                                'sizes',
                                                values.sizes.includes(size)
                                                    ? values.sizes.filter(s => s !== size)
                                                    : [...values.sizes, size]
                                            )}
                                            key={size}
                                            style={{ flex: 1, backgroundColor: values.sizes.includes(size) ? theme['color-primary-200'] : undefined }}
                                        >
                                            {size}
                                        </Button>
                                    ))
                                }
                            </ButtonGroup>

                            <ButtonGroup
                                style={{ margin: 2, marginTop: 20, marginHorizontal: 15 }} size="small"
                                appearance="outline"
                            >
                                {
                                    genders.map(gender => (
                                        <Button
                                            onPress={() => setFieldValue('gender', gender)}
                                            key={gender}
                                            style={{ flex: 1, backgroundColor: values.gender.startsWith(gender) ? theme['color-primary-200'] : undefined }}
                                        >
                                            {gender}
                                        </Button>
                                    ))
                                }
                            </ButtonGroup>

                            {/* Boton guardar */}
                            <Button
                                accessoryLeft={<MyIcon name="save-outline" white />}
                                onPress={() => handleSubmit()}
                                style={{ margin: 15 }}
                            // disabled={mutation.isPending}
                            >
                                Guardar
                            </Button>

                            <Layout style={{ height: 170 }} />
                        </ScrollView >
                    </MainLayout >
                )
            }
        </Formik>
    )
}