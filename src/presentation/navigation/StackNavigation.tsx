import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ProductScreen } from '../screens/product/ProductScreen';

export type RootStackParams = {
    LoadingScreen: undefined;
    LoginScreen: undefined;
    RegisterScreen: undefined;
    HomeScreen: undefined;
    ProductScreen: { productId: string };
}

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
    return {
        cardStyle: {
            opacity: current.progress
        }
    }
}

export const StackNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName='LoadingScreen'
            screenOptions={{
                headerShown: false,
                // cardStyleInterpolator: fadeAnimation
            }}
        >
            <Stack.Screen
                options={{
                    cardStyleInterpolator: fadeAnimation
                }}
                name="LoadingScreen"
                component={LoadingScreen}
            />

            <Stack.Screen
                options={{
                    cardStyleInterpolator: fadeAnimation
                }}
                name="LoginScreen"
                component={LoginScreen}
            />

            <Stack.Screen
                options={{
                    cardStyleInterpolator: fadeAnimation
                }}
                name="RegisterScreen"
                component={RegisterScreen}
            />

            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
            />

            <Stack.Screen
                name="ProductScreen"
                component={ProductScreen}
            />
        </Stack.Navigator>
    );
}