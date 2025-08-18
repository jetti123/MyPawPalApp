// filepath: PawPalApp/App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
// impordi teised ekraanid hiljem

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        {/* Lisa teised ekraanid siia */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
