// filepath: PawPalApp/App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import IWantToScreen from './screens/IWantToScreen';
import ChooseServiceScreen from './screens/ChooseServiceScreen';
// impordi teised ekraanid hiljem

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="IWantTo" component={IWantToScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChooseService" component={ChooseServiceScreen} options={{ headerShown: false }} />
        {/* Lisa teised ekraanid siia */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
