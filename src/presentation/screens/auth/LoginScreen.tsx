import { Button, Input, Layout, Text } from "@ui-kitten/components"
import { Alert, ScrollView, useWindowDimensions } from "react-native"
import { MyIcon } from "../../components/ui/MyIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigation";
import { useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }

export const LoginScreen = ({ navigation }: Props) => {
    const { height } = useWindowDimensions();

    const { login } = useAuthStore();

    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const onLogin = async () => {

        if (form.email.length === 0 || form.password.length === 0) {
            return;
        }

        setIsLoading(true);
        const wasSuccessful = await login(form.email, form.password);
        setIsLoading(false);

        if (wasSuccessful) return;

        Alert.alert('Error', 'Usuario o contraseña incorrectos');

    }

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{
                marginHorizontal: 40
            }}>
                <Layout style={{
                    paddingTop: height * 0.35
                }}>
                    <Text category="h1">Ingresar</Text>
                    <Text category="p2">Por favor, ingrese para continuar</Text>
                </Layout>

                {/* Inputs */}
                <Layout style={{ marginTop: 20 }}>
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
                            onPress={onLogin}
                            accessoryRight={
                                <MyIcon name="arrow-forward-outline" white />
                            }
                        // appearance="ghost"
                        >
                            Ingresar
                        </Button>
                    </Layout>

                    {/* Create account */}
                    <Layout style={{ height: 40 }} />

                    <Layout style={{
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <Text>You don't have account?</Text>
                        <Text
                            status="primary"
                            category="s1"
                            onPress={() => navigation.navigate('RegisterScreen')}
                        >
                            {' '}
                            Create one
                        </Text>
                    </Layout>
                </Layout>
            </ScrollView>
        </Layout >
    )
}
