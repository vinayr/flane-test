import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import config from './config';
import Api from './api';

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

  async function addToCart() {
    const params = { topic: 'ADD_TO_CART' };
    await Api.subscribe(config.user.id, params);
  }

  async function orderItems() {
    let params = { topic: 'ADD_TO_CART' };
    await Api.unsubscribe(config.user.id, params);

    // params = { topic: 'ORDER_ITEMS' };
    // await Api.subscribe(config.user.id, params);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello World</Text>
      <View>
        <Button title="Add To Cart" onPress={addToCart} />
        <Button title="Order" onPress={orderItems} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
