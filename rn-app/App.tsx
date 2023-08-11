import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import config from './config';
import Api from './api';
import { RootStackParamList } from './types';
import Home from './screens/Home';
import Product from './screens/Product';
import Cart from './screens/Cart';
import ThankYou from './screens/ThankYou';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  useEffect(() => {
    const updateUserToken = async () => {
      // Request permissions (required for iOS)
      await notifee.requestPermission();
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();

      const user = {
        ...config.user,
        deviceToken: token,
      };
      Api.updateUser(user);
    };

    updateUserToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="ThankYou" component={ThankYou} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
