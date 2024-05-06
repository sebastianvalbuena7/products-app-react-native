import { Button, Input, Layout, Text } from "@ui-kitten/components"
import { Alert, ScrollView, useWindowDimensions } from "react-native"
import { MyIcon } from "../../components/ui/MyIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigation";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { useState } from "react";

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> { }

export const RegisterScreen = ({ navigation }: Props) => {
    const { height } = useWindowDimensions();

    const { register } = useAuthStore();

    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        email: '',
        password: '',
        fullName: ''
    });

    const onRegister = async () => {
        if (form.email.length === 0 || form.password.length === 0 || form.fullName.length === 0) {
            return;
        }

        setIsLoading(true);
        const wasSuccessful = await register(form.email, form.password, form.fullName);
        setIsLoading(false);

        if (wasSuccessful) return;

        Alert.alert('Error', 'Ha ocurrido un error');
    }

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{
                marginHorizontal: 40
            }}>
                <Layout style={{
                    paddingTop: height * 0.30
                }}>
                    <Text category="h1">Crear Cuenta</Text>
                    <Text category="p2">Por favor, crea una cuenta para continuar</Text>
                </Layout>

                {/* Inputs */}
                <Layout style={{ marginTop: 20 }}>
                    <Input
                        placeholder="Name"
                        keyboardType="name-phone-pad"
                        style={{ marginBottom: 10 }}
                        accessoryLeft={<MyIcon name="person-outline" />}
                        value={form.fullName}
                        onChangeText={fullName => setForm({ ...form, fullName: fullName })}
                    />

                    <Input
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={{ marginBottom: 10 }}
                        accessoryLeft={<MyIcon name="email-outline" />}
                        value={form.email}
                        onChangeText={email => setForm({ ...form, email: email })}
                    />

                    <Input
                        placeholder="Password"
                        secureTextEntry
                        autoCapitalize="none"
                        style={{ marginBottom: 10 }}
                        accessoryLeft={<MyIcon name="lock-outline" />}
                        value={form.password}
                        onChangeText={password => setForm({ ...form, password: password })}
                    />

                    {/* Space */}
                    <Layout style={{ height: 20 }} />

                    {/* Button */}
                    <Layout>
                        <Button
                            disabled={isLoading}
                            onPress={onRegister}
                            accessoryRight={
                                <MyIcon name="arrow-forward-outline" white />
                            }
                        // appearance="ghost"
                        >
                            Crear
                        </Button>
                    </Layout>

                    {/* Create account */}
                    <Layout style={{ height: 40 }} />

                    <Layout style={{
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <Text>You have account?</Text>
                        <Text
                            status="primary"
                            category="s1"
                            onPress={() => navigation.pop()}
                        >
                            {' '}
                            Log in
                        </Text>
                    </Layout>
                </Layout>
            </ScrollView>
        </Layout >
    )
}
